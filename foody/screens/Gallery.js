import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API, API_GET, API_IMAGE_URL } from "../constants/API";
import { useSelector } from "react-redux";
import { BlurView } from 'expo-blur';

import * as theme from '../style/theme';



const Gallery = ({ navigation, route }) => {

    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.accountPref.username)
    const profileImage = useSelector((state) => state.accountPref.profileImage);
    // const gal_blogs = useSelector((state) => state.accountPref.gal_blogs);
    // const blogs = useSelector((state) => state.accountPref.blogs);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const created_at = new Date()

    useEffect(() => {
        console.log("Setting up nav listener");
        
        const removeListener = navigation.addListener("focus", () => {
            console.log("Running nav listener");
            getPosts();
        });
        getPosts();
        return removeListener;
    }, []);

    // async function onRefresh() {
    //     setRefreshing(true);
    //     const response = await getPosts();
    //     setRefreshing(false);
    // }
    
    async function getPosts() {
        
        try {
            const response = await axios.get(API + API_GET, {
                headers: { Authorization: `JWT ${token}` },
            });
           
            // console.log(response.data);
            setPosts(response.data.allblogs);
            
            
            return "completed"

        } catch (error) {
            console.log(error)
            console.log(error.response.data);
            if (error.response.data.error = "Invalid token") {
                navigation.navigate("SignInSignUp");
            }
        }
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: theme.SIZES.padding,
                    alignItems: 'center',
                    height: 80
                }}
            >
                <View
                style={{
                    flex: 1
                }}
                >
                    <Text
                        style={{
                            color: theme.COLORS.darkGreen,
                            ...theme.FONTS.h2
                        }}
                    >
                        {username}
                    </Text>
                    <Text
                        style={{
                            marginTop: 3,
                            color: theme.COLORS.gray,
                            ...theme.FONTS.h3
                    }}
                    >
                        Let's make you drool today...
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => consolelog("Profile")}
                >
                    <Image
                        source={{ uri: profileImage }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    function renderItem({ item }) {
        return (
            <TouchableOpacity
            style={{
                height: 350,
                width: 400,
                marginTop: theme.SIZES.radius,
                marginBottom: 20,
                borderRadius: theme.SIZES.radius,
            }}
            // onPress={'null'}
            >
                <Image
                    source={{ uri: API_IMAGE_URL + item.image }}
                    resizeMode="cover"
                    style={{
                        height: 350,
                        width: 400,
                        marginHorizontal: 15,
                        borderRadius: theme.SIZES.radius 
                }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 30,
                        paddingHorizontal: theme.SIZES.radius,
                        paddingVertical: 5,
                        backgroundColor: theme.COLORS.transparentGray,
                        borderRadius: 5
                    }}
                 >
                    <Text
                        style={{
                            color: theme.COLORS.white,
                            ...theme.FONTS.h4
                        }}
                    >
                        {item.title}
                    </Text>
                </View>
                <View
                    style={{
                        height: 50,
                        width: 50,
                        backgroundColor: theme.COLORS.white2,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        bottom: 90,
                        left: 15
                    }}
                >
                <Image
                        source={{ uri: API_IMAGE_URL + item.profileImage }}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 25,
                        }}
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        left: 15,
                        paddingHorizontal: theme.SIZES.radius,
                        paddingVertical: 5,
                        backgroundColor: theme.COLORS.transparentGray,
                        borderRadius: theme.SIZES.radius,
                    }}
                >
                    
                    <Text
                        style={{
                            color: theme.COLORS.white,
                            ...theme.FONTS.h4
                        }}
                    >
                       {/* Shared on: {new Date(item.created_at * 1000).toString() + ' ' + new Date(item.created_at * 1000).toLocaleTimeString('en-US')} */}
                        Shared by: {item.author}
                    </Text>
                    
                </View>
                
                
            </TouchableOpacity>
        )
    }
    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.white,
                marginTop: 60
            }}
        >
            {/* <Text>{recipe.ingredients}</Text> */}
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                showVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {renderHeader()}
                    </View>
                }
                renderItem={renderItem}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 60
                        }}
                    />
                }
                // refreshControl={
                //     <RefreshControl
                //       refreshing={refreshing}
                //       onRefresh={onRefresh}
                //     />
                // }
            />           
       
        </SafeAreaView>
    )
}

export default Gallery;

