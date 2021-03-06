
const UPLOAD_USER_ID = "upload_user_id";
const UPLOAD_USERNAME = "upload_username";
const UPLOAD_PROFILEIMAGE = "upload_profileimage";
const UPLOAD_DATE_JOINED = "upload_date_joined";
const UPLOAD_COUNT = "upload_count";
const UPLOAD_BLOGS = "upload_blogs";
// const UPLOAD_GALBLOGS = "upload_galblogs";
// const UPLOAD_BLOG_ID = "upload_blog_id";
// const UPLOAD_BLOG_TITLE = "upload_blog_title";
// const UPLOAD_BLOG_INSTRUCTION = "upload_blog_instruction";



const initialState = {
    user_id: null,
    username: "",
    profileImage: "",
    date_joined: "",
    count: "",
    blogs: "",
    // galblogs: ""
};

export function changeModeAction() {
    return { type: CHANGE_MODE }
}

export function uploadUserIDAction() {
    return { type: UPLOAD_USER_ID }
}

export function uploadUsernameAction() {
    return { type: UPLOAD_USERNAME }
}

export function uploadProfileImageAction() {
    return { type: UPLOAD_PROFILEIMAGE }
}

export function uploadDateJoinedAction() {
    return { type: UPLOAD_DATE_JOINED }
}

export function uploadBlogsAction() {
    return { type: UPLOAD_BLOGS }
}

export function uploadCountAction() {
    return { type: UPLOAD_COUNT }
}

// export function upload_galblogsAction() {
//     return { type: UPLOAD_GALBLOGS }
// }

export default function accountPrefReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_USER_ID:
            return { ...state, user_id: action.payload }
        case UPLOAD_USERNAME:
            return { ...state, username: action.payload }
        case UPLOAD_PROFILEIMAGE:
            return { ...state, profileImage: action.payload }
        case UPLOAD_DATE_JOINED:
            return { ...state, date_joined: action.payload }
        case UPLOAD_BLOGS:
            return { ...state, blogs: action.payload }
        case UPLOAD_COUNT:
            return { ...state, count: action.payload }
        // case UPLOAD_GALBLOGS:
        //     return { ...state, count: action.payload }        
        default:
            return state;
    }
}