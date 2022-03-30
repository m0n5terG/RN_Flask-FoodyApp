from unicodedata import category
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, ValidationError, fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, SQLAlchemySchema, auto_field
from flask_jwt import JWT, jwt_required, current_identity
import os
import base64
import uuid
import bcrypt
from io import BytesIO
from PIL import Image
from datetime import datetime, timedelta


# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(basedir,"static/images/")
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.database')
app.config['SECRET_KEY'] = 'Secret Key'
app.config["JWT_EXPIRATION_DELTA"] = timedelta(days=1) # expire after 1 day
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

cors = CORS(app, resources={r"/*": {"origins": "*"}})
# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    profileImage = db.Column(db.String(36), default='default.jpg')
    password = db.Column(db.String(60))
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)
    blogs = db.relationship('Blog', backref='user', cascade='all,delete-orphan', lazy=True)
    comments = db.relationship('Comment', backref='user_comment', cascade='all,delete-orphan', lazy=True)
    likes = db.relationship('Like', backref='user', cascade='all,delete-orphan', lazy=True)


ingredient_blog = db.Table('ingredient_blog',
    db.Column('ingredient_id',db.Integer,db.ForeignKey('ingredient.id'), primary_key=True),
    db.Column('blog_id', db.Integer,db.ForeignKey('blog.id'),primary_key=True))


class Ingredient(db.Model):
    id  = db.Column(db.Integer,primary_key=True)
    item = db.Column(db.String(20))
        
        
class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=True)
    instruction = db.Column(db.Text)
    serving = db.Column(db.Integer)
    duration = db.Column(db.String(10))
    image = db.Column(db.String(36))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    ingredients = db.relationship('Ingredient', secondary=ingredient_blog, backref=db.backref('blogs_associated', lazy="dynamic"))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref = db.backref('blogs', lazy=True)) 
    author = db.Column(db.Integer, db.ForeignKey('user.username', ondelete='CASCADE'), nullable=False)
    comments = db.relationship('Comment', backref='post_comment', cascade='all,delete-orphan', lazy=True)
    likes = db.relationship('Like', backref='post', cascade='all,delete-orphan', lazy=True)   


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))   


class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id', ondelete='CASCADE'), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey('user.username', ondelete='CASCADE'), nullable=False)
    

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    content = db.Column(db.String(200))
    blog_id = db.Column(db.Integer, db.ForeignKey('blog.id', ondelete='CASCADE'), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey('user.username', ondelete='CASCADE'), nullable=False)
    

class IngredientName(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return ''
        return value.item    
                 
class CategorySchema(SQLAlchemySchema):
    class Meta:
        fields = ("id", "name")
        
class CommentSchema(SQLAlchemySchema):
    class Meta:
        fields = ("id", "content", "author")

class LikeSchema(ma.Schema):
    class Meta:
        fields = ("blog_id", "author")

class IngredientSchema(ma.Schema):
    id = fields.Int()
    item = fields.Str()
    
    
class BlogSchema(SQLAlchemyAutoSchema):
    category = fields.Nested(CategorySchema(only=("name",)))
    ingredients = fields.List(IngredientName(only=("item",), many=True))
    comments = fields.List(fields.Nested(CommentSchema(only=("content", "author"))))
    likes = fields.List(fields.Nested(LikeSchema(only=("author",))))
    
    class Meta:
        ordered: True
        
        fields = ('id', 'title', 'instruction', 'image', 'author', 'category', 'likes',
                  'ingredients', 'serving', 'duration', 'created_at', 'updated_at', 'comments')
        

class UserSchema(SQLAlchemyAutoSchema):
    
    class Meta:
        # fields = ('id', 'username', 'email', 'profileImage', 'blogs', 'date_joined')
        model = User
        include_relationships = True
        load_instance = True
    

# class BlogSchema2(SQLAlchemyAutoSchema):  
       
#     class Meta:
#         # fields = ('id', 'title', 'image', 'created_at', 'authors')
#         model = Blog
#         # include_fk = True
#         load_instance = True
        
#     authors = Nested(UserSchema(only=('username', 'profileImage')))
    
user_schema = UserSchema()
users_schema = UserSchema(many=True)            
blog_schema = BlogSchema()
blogs_schema = BlogSchema(many=True) 
comments_schema = CommentSchema(many=True)
# blogs_schema2 = BlogSchema2(many=True)    

           
db.create_all()


def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    
    if user and bcrypt.checkpw(password.encode('utf8'), user.password):
        return user

def identity(payload):
    return User.query.filter_by(id=payload["identity"]).first()

jwt = JWT(app, authenticate, identity)


# Get All users
@app.route("/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    
    result = users_schema.dump(all_users)
    
    return jsonify({ 'users':result })


# Create new user
@app.route("/add_user", methods=['POST'])
def add_user():
    data = request.get_json()
    
    username = data["username"]
    email = data["email"]
    password = data["password"]
    users = User.query.all()
    for u in users:
        if username == u.username:
            return jsonify({ "Error": "User already exists" })
        elif email == u.email:
            return jsonify({ "Error": "Email already exists" })
    
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(username=username, email=email, password=hashed)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({ "Success": "New user " + username + " created" }), 201


@app.route("/edit_user", methods=['PUT', 'DELETE'])
@jwt_required()
def edit_user():
    # blog = Blog.query.filter_by(id=id).first_or_404()
    user = User.query.filter_by(id=current_identity.id).first_or_404()
    if not user:
        abort(404)
    else:
        if request.method == 'DELETE':
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], user.profileImage))
            
            db.session.delete(user)
            db.session.commit()
            
            return jsonify({"Message": "User deleted!"}),204
        
        elif request.method == 'PUT':
            
            data = request.get_json()         
            
            imageFileName = str(uuid.uuid4()) + '.jpg'
            newProfileImage = imageFileName
            # os.remove(os.path.join(app.config['UPLOAD_FOLDER'], user.profileImage))
            
            username = data['username']
            password = data['password']
            
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            
            user.username = username
            user.password = hashed
            user.profileImage = newProfileImage
            
            db.session.commit()
            
            newProfileImage = bytes(request.json['profileImage'], encoding="ascii")
            im = Image.open(BytesIO(base64.b64decode(newProfileImage)))
            im.save(os.path.join(app.config['UPLOAD_FOLDER'], imageFileName))
            
            return jsonify({ "Success": "User " + username + " updated" }),201


# Create Blog
@app.route('/add_blog', methods=['POST'])
@jwt_required()
def add_blog():
    data = request.get_json()
 
    imageFileName = str(uuid.uuid4()) + '.jpg'
    image = imageFileName
    
    new_blog = Blog(title=data["title"],instruction=data["instruction"],serving=data["serving"],image=imageFileName,
                    duration=data["duration"],category_id=data["category_id"],author=current_identity.username)
        
    
    for ingredient in data["ingredients"]:
        present_ing = Ingredient.query.filter_by(item=ingredient).first()
        if(present_ing):
            present_ing.blogs_associated.append(new_blog)
        else:
            new_ingredient = Ingredient(item=ingredient)
            new_ingredient.blogs_associated.append(new_blog)
            db.session.add(new_ingredient)
    
    for category in data["category"]:
        present_cat = Category.query.filter_by(name=category).first()
        if(present_cat):
            present_cat.blogs.append(new_blog)
        else:
            new_cat = Category(name=category)
            new_cat.blogs.append(new_blog)
            db.session.add(new_cat)
 
    db.session.add(new_blog)
    db.session.commit()
    
    image = bytes(request.json['image'], encoding="ascii")
    im = Image.open(BytesIO(base64.b64decode(image)))
    im.save(os.path.join(app.config['UPLOAD_FOLDER'], imageFileName))
    
    return jsonify(blog_schema.dump(new_blog)),201
    
    
# Get all Blogs
@app.route('/blogs',methods=["GET"])
def get_all_blogs():
    allblogs = Blog.query.order_by(Blog.created_at.desc()).all()
       
    results = blogs_schema.dump(allblogs)
    
    return jsonify({"allblogs": results})
    
# Get all Blogs Category


# Get Blog by id
@app.route('/blog/<int:id>',methods=["GET"])
def get_single_blog(id):
    blog = Blog.query.filter_by(id=id).first()
    likes = Like.query.all()
    
    result = blog_schema.dump(blog)
        
    return jsonify({'single_blog': result, 'likesCount': len(likes)})


# Update Blog
@app.route('/update_blog/<int:id>', methods=["PUT"])
@jwt_required()
def update_blog(id):
    
    imageFileName = str(uuid.uuid4()) + '.jpg'
    image = imageFileName
    
    blog = Blog.query.filter_by(id=id).first_or_404()
    
    data = request.get_json()
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], blog.image))
    
    blog.title = data["title"]
    blog.instruction = data["instruction"]
    # blog.category = data["category"]
    blog.image = image
    blog.serving = data["serving"]
    blog.duration = data["duration"]
    
    # for ingredient in data["ingredients"]:
    #     present_ing = Ingredient.query.filter_by(item=ingredient).first()
    #     if(present_ing):
    #         present_ing.blogs_associated.append(new_blog)
    #     else:
    #         new_ingredient = Ingredient(item=ingredient)
    #         new_ingredient.blogs_associated.append(new_blog)
    #         db.session.add(new_ingredient)
   
    db.session.commit()
    
    image = bytes(request.json['image'], encoding="ascii")
    im = Image.open(BytesIO(base64.b64decode(image)))
    im.save(os.path.join(app.config['UPLOAD_FOLDER'], imageFileName))
    
    return jsonify(blog_schema.dump(blog)),200
# if 'ingredients' in data:  
#         blog.ingredients = data['ingredients']

# Delete selected Blog
@app.route('/delete_blog/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_blog(id):
    blog = Blog.query.filter_by(id=id).first()
    user = current_identity.id
    if user != blog.author:
        return jsonify({ "Error": "user not authorised!" }),401
    
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], blog.image))
    db.session.delete(blog)
    db.session.commit()
 
    return jsonify({"Message": "Post Deleted!"}),204


@app.route('/delete_user/<int:id>', methods=["DELETE"])
# @jwt_required()
def delete_user(id):
    user = User.query.filter_by(id=id).first()
    # user = current_identity.id
    # if user != blog.author:
    #     return jsonify({ "Error": "user not authorised!" }),401
    
    # os.remove(os.path.join(app.config['UPLOAD_FOLDER'], user.profileImage))
    db.session.delete(user)
    db.session.commit()
 
    return jsonify({"Message": "Post Deleted!"}),204


# Give Like to selected Blog
@app.route('/likes/<blog_id>', methods=['POST'])
@jwt_required()
def like(blog_id):
    blog = Blog.query.get(blog_id)
    like = Like.query.filter_by(author=current_identity.username, blog_id=blog_id).first()
    
    if not blog:
        return jsonify({"Message": "Post does not exist"})
    elif like:    
        db.session.delete(like)
        db.session.commit() 
        return jsonify({"Message": "Post like removed"})   
    else:
        like = Like(author=current_identity.username, blog_id=blog_id)
        db.session.add(like)
        db.session.commit()
        
    return jsonify({"Message": "Post like added"}),200


# Create Comment
@app.route('/add_comment/<blog_id>', methods=['POST'])
@jwt_required()
def add_comment(blog_id):
    
    content = request.json['content']
    
    if not content:
        return jsonify({"Message": "Comment cannot be empty"})
    else:
        # post = Post.query.filter_by_or_404(id=post_id).first()
        post = Blog.query.get_or_404(blog_id)
        comment = Comment.query.filter_by(blog_id=blog_id).all()
        current_user_comments = Comment.query.filter_by(blog_id=blog_id,author=current_identity.username).first()
        if current_user_comments:
            return jsonify({"Message": "You can only comment once."})
        else:
            if post:
                comment = Comment(
                    content=content, 
                    author=current_identity.username, 
                    blog_id=blog_id
                )
                
                db.session.add(comment)
                db.session.commit()
                
            else:
                return jsonify({"Message": "Post does not exist"})
        
        
    return jsonify({"Message": "Comment added"}),200


# Get All comments on selected blog
@app.route('/get_comment/<blog_id>', methods=['GET'])
@jwt_required()
def get_comments(blog_id):
    
    all_comments = Comment.query.filter_by(blog_id=blog_id).all()
    result = comments_schema.dump(all_comments)
    return jsonify({'comments':result})


# Search list Recipe
@app.route('/search', methods=['POST'])
def search():
    q = request.json.get('search')
    if q:
        results = Blog.query.filter(Blog.title.contains(q))
    else:
        results = Blog.query.all()
        
    found = blogs_schema.dump(results)    
    return jsonify({'results': found})


# Indentify and Auth current user
@app.route('/whoami')
@jwt_required()
def auth():
    count = Blog.query.filter_by(author=current_identity.username)
    results = blogs_schema.dump(count)
    
    return jsonify({
        "user_id": current_identity.id,
        "username": current_identity.username,
        "profileImage": current_identity.profileImage,
        "date_joined": current_identity.date_joined,
        "blogs": results,
        "count": len(results)
    })

# Get current user post
@app.route('/posts/me', methods=['GET'])
@jwt_required()
def my_post():
    myRecipe = Blog.query.filter_by(author=current_identity.username).all()
    results = blogs_schema.dump(myRecipe)

    return jsonify({'posts':results})
    
# Run Server
if __name__ == '__main__':
    app.run(debug=True)
    # host = '192.168.50.46',port=19000, 