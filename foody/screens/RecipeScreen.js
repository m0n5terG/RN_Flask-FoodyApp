import React, {useState, useEffect, useRef} from 'react';
import {
    Animated,
    FlatList,
    View,
    Text,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Avatar,
    FAB,
    TextInput
 } from 'react-native-paper';
import moment from 'moment';

import * as theme from '../style/theme';
import { API, API_DELETE ,API_GET_FB, API_GET_SP, API_IMAGE_URL } from '../constants/API';
import axios from 'axios';
import { logOutAction } from '../redux/ducks/blogAuth';
import { useDispatch, useSelector } from "react-redux";

const HEADER_HEIGHT = 350;

const RecipeAuthorDetails =({ selectedRecipe }) => { 
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                        backgroundColor: theme.COLORS.white2,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20
                    }}
                >
                <Avatar.Image
                    source={{ uri: API_IMAGE_URL + selectedRecipe?.profileImage}}
                    size={45}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 20
                    }}
                >
                    <Text style={{color: theme.COLORS.lightGray2, ...theme.FONTS.body4}}>Shared by:</Text>
                    <Text style={{color: theme.COLORS.white2, ...theme.FONTS.body3}}>{selectedRecipe?.author}</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        marginRight: 20
                    }}
                >
                    <Text style={{color: theme.COLORS.lightGray2, ...theme.FONTS.body4}}>Posted on:</Text>
                    <Text style={{color: theme.COLORS.white2, ...theme.FONTS.body3}}>{moment(selectedRecipe?.created_at).fromNow()}</Text>
                </View>
        </View>
    )
}

const RecipeAurthorCardInfo = ({ selectedRecipe }) => {
    return (
        <View
            style={{
                flex: 1,
                borderRadius: theme.SIZES.radius,
                backgroundColor: theme.COLORS.transparentBlack7
            }}
        >
            <RecipeAuthorDetails 
                selectedRecipe={selectedRecipe}
            />
        </View>
    )
}

const RecipeScreen = ({ navigation, route }) => {

    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [content, setContent] = useState("");
    const [errorText, setErrorText] = useState("");
    const token = useSelector((state) => state.auth.token);

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let { recipe } = route.params
        setSelectedRecipe(recipe) 
    }, [])

    async function deletePost() {
        const id = selectedRecipe?.id
            // console.log(id)      
        try {
            const response = await axios.delete(API + API_DELETE + id, { 
                headers: { Authorization: `JWT ${token}` }, });
            console.log(response)

            navigation.navigate('GalleryS')
                    
            } catch (error) {
                console.log(error.response.data);
                if ((error.response.status = 401)) {
                    alert("You're not authorised!")
                }
            }
        }

        // async function getSinglePosts() {
        //     const id = selectedRecipe?.id
        //     console.log(id)
        //     try {
        //         const response = await axios.get(API + API_GET_SP + id, {
        //             headers: { Authorization: `JWT ${token}` },
        //         })
        //         console.log(response.data);
        //         setSelectedRecipe(response.data.single_blogs);
        //         return "completed"
    
        //     } catch (error) {
        //         console.log(error)
        //         console.log(error.response.data);
        //         if (error.response.data.error = "Invalid token") {
        //             navigation.navigate("LoginSignUp");
        //         }
        //     }
        // }
        
    

    function renderHeaderBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 90,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingHorizontal: theme.SIZES.padding,
                    paddingBottom: 10
                }}
            >
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: theme.COLORS.black,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT -100, HEADER_HEIGHT -70],
                            outputRange: [0, 1]
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                    outputRange: [50, 0],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                />

                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 10,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT -100, HEADER_HEIGHT -50],
                            outputRange: [0, 1]
                        })
                    }}
                >
                    <Text
                        style={{
                            color: theme.COLORS.lightGray2,
                            ...theme.FONTS.body4
                        }}
                    >
                        Shared by:
                    </Text>
                    <Text
                        style={{
                            color: theme.COLORS.white2,
                            ...theme.FONTS.h3
                        }}
                    >{selectedRecipe?.author}</Text>

                </Animated.View>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: theme.COLORS.lightGray,
                        backgroundColor: theme.COLORS.transparentBlack3
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={require('../assets/icons/back.png')}
                        style={{
                            width: 15,
                            height: 15,
                            tintColor: theme.COLORS.lightGray
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,
                    }}
                >
                    <Image 
                        source={require('../assets/icons/like.png')}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: theme.COLORS.red
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeader() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                    marginTop: -1000,
                    paddingTop: 1000
                }}
            >
                <Animated.Image
                    source={{uri: API_IMAGE_URL + selectedRecipe?.image}}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75]
                                })
                            }
                        ]
                    }}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 30,
                        right: 30,
                        height: 80,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 170, 250],
                                    outputRange: [0, 0, 100],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <RecipeAurthorCardInfo 
                        selectedRecipe={selectedRecipe}
                    />
                 </Animated.View>
             </View>
        )
    }

    function renderRecipeInfo() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 230,
                    width: theme.SIZES.width,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    alignItems: 'center'  
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Edit", {recipe: selectedRecipe})}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 10
                    }}>
                    <Image
                        source={require('../assets/icons/edit.png')}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: theme.COLORS.gray
                        }}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={deletePost}
                    style={{
                        position: 'absolute',
                        right: 60,
                        top: 10
                    }}>
                    <Image
                        source={require('../assets/icons/delete.png')}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flex: 1,
                        position: 'absolute',
                        top: 15,
                        left: 20    
                    }}
                >
                    <Text style={{ ...theme.FONTS.h2, fontWeight: '900' }}>{selectedRecipe?.title}</Text>
                </View>
                <View
                    style={{
                        flex: 1,   
                    }}
                > 
                    {/* <View 
                        style={{
                            alignItems: 'flex-start'
                        }}
                    > */}
                        <Text style={{ ...theme.FONTS.h3, color: theme.COLORS.darkGreen, fontWeight: '700'}}>INSTRUCTION: </Text>
                        <Text style={{ ...theme.FONTS.h3 }}>{selectedRecipe?.instruction} </Text>
                    {/* </View> */}
                    {/* <View 
                        style={{
                            alignItems: 'flex-start',
                        }}
                    > */}
                        <Text style={{ ...theme.FONTS.h3, color: theme.COLORS.darkGreen, fontWeight: '700' }}>INGREDIENTS:</Text>
                        <Text style={{ ...theme.FONTS.h3 }}>{selectedRecipe?.ingredients}</Text> 
                            {/* {selectedRecipe?.ingredients.map((unit, key) => {
                                return <Text key={key}>{unit.item}</Text>
                        })}   */}
                    {/* </View> */}
                    <Text
                        style={{
                            marginTop: 5,
                            color: theme.COLORS.lightGray2,
                            ...theme.FONTS.body4
                        }}
                    >{selectedRecipe?.duration} | {selectedRecipe?.serving} Serving</Text>
                </View>
                <View 
                    style={{
                        alignItems: 'flex-end',
                        width: 50
                }}>
                    <Image
                        source={require('../assets/icons/likes.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: theme.COLORS.lightGreen1
                        }}/>
                    <Text 
                        style={{
                            alignSelf: 'center', 
                            marginTop: 10, 
                            color: theme.COLORS.lime,
                            ...theme.FONTS.h2}}
                    >
                        {selectedRecipe?.likes.length}
                    </Text> 
                </View> 
            </View>
        )
    }

    function renderCommentsHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                    marginBottom: theme.SIZES.padding,
                    marginTop: theme.SIZES.radius
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...theme.FONTS.h3
                    }}
                >
                    Comments
                </Text>
                {/* <Text
                    style={{
                        color: theme.COLORS.lightGray2,
                        ...theme.FONTS.body4
                    }}
                >
                    {selectedRecipe?.comments.length} comments
                </Text> */}
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: -5
                    }}>
                    <Image
                        source={require('../assets/icons/addpost.png')}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: theme.COLORS.gray
                        }}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View
            style={{
                flex:1,
                backgroundColor: theme.COLORS.white,
            }}
        >
           <Animated.FlatList
                data={selectedRecipe?.comments}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
            
                        { renderHeader() }

                        { renderRecipeInfo() }

                        { renderCommentsHeader() }
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({item}) => {
                    return (
                        <View
                            style={{
                                marginBottom: 5,
                                paddingHorizontal: 10,
                            }} 
                        > 
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 5,
                                    width: '100%',
                                    borderRadius: theme.SIZES.radius,
                                    backgroundColor: theme.COLORS.lightGray
                                }}
                            >
                                <View
                                    style={{
                                        alignContent: 'flex-start',
                                        width: 300,
                                        paddingLeft: 15
                                    }}
                                >
                                    <Text
                                        style={{
                                            ...theme.FONTS.body4
                                        }}
                                    >
                                            {item.content}
                                    </Text>
                                </View>
                                
                                <View
                                    style={{
                                        flex: 1,
                                        
                                        alignContent: 'flex-end',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 10
                                        
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...theme.FONTS.body3
                                            }}
                                        >
                                        {item.author}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                ...theme.FONTS.body5,
                                                color: theme.COLORS.gray,
                                            }}
                                        >
                                            {`Posted on ${moment(item.created_at).format('DD-MM-YY')}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>  
                        </View>
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 150
                        }}
                    />
                }
            />
            {renderHeaderBar()}
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <View style={{
                            backgroundColor: theme.COLORS.gray3,
                            width: '90%',
                            height: 500,
                            alignItems: 'center',
                            paddingHorizontal: 3,
                            paddingVertical: 20,
                            borderRadius: theme.SIZES.radius
                        }}>
                            <Text style={{ ...theme.FONTS.body1}} >Comments</Text>
                            <TextInput
                                placeholder="Enter your comments"
                                width={300}
                                multiline={true}
                                numberOfLines={6}
                                maxLength={200}
                                value={content}
                                mode='outlined'
                                label="Comment" 
                                activeOutlineColor="#2AD699"
                                onChangeText={(content) => setContent(content)}
                            />
                            <FAB
                                style={{
                                    position: 'absolute',
                                    margin: 16,
                                    bottom: -11,
                                    right: -10
                                }}
                                small
                                icon="plus"
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </Modal>
                {/* <FAB
                    style={{
                        position: 'absolute',
                        margin: 16,
                        bottom: 90,
                        right: 10
                    }}
                    small
                    icon="plus"
                    onPress={() => setModalVisible(!modalVisible)}
                /> */}
            </View>   
        </View>
    )
}

export default RecipeScreen;