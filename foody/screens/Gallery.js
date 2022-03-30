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
import {
    Avatar,
    // Card,
    // Title,
    // Paragraph,
    // List
 } from 'react-native-paper';
import axios from 'axios';
import { API, API_GET, API_IMAGE_URL } from "../constants/API";
import { useSelector } from "react-redux";
import moment from 'moment';
import { BlurView } from 'expo-blur';

import * as theme from '../style/theme';



const Gallery = ({ navigation, route }) => {

    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.accountPref.username)
    const profileImage = useSelector((state) => state.accountPref.profileImage);
    
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(() => {
        // console.log("Setting up nav listener");
        
        const removeListener = navigation.addListener("focus", () => {
            // console.log("Running nav listener");
            getPosts();
        });
            getPosts();
        return removeListener;
    }, []);
    
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
                        width:'100%',
                        marginHorizontal: 15,
                        borderRadius: theme.SIZES.radius 
                }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 5,
                        left: 20,
                        paddingHorizontal: theme.SIZES.radius,
                        paddingVertical: 5,
                        backgroundColor: theme.COLORS.transparentGray2,
                        borderRadius: theme.SIZES.radius
                    }}
                 >
                    <Text
                        style={{
                            color: theme.COLORS.white2,
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
                        bottom: 55,
                        left: 20
                    }}
                >
                <Avatar.Image
                    source={{ uri: API_IMAGE_URL + item.profileImage }}
                    size={45}
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        left: 250,
                        paddingHorizontal: theme.SIZES.radius,
                        paddingVertical: 5,
                    }}
                >
                    
                    <Text
                        style={{
                            color: theme.COLORS.white,
                            ...theme.FONTS.h4
                        }}
                    >
                        {`Shared: ${moment(
                               item.created_at,
                               'YYYYMMDD',
                           ).fromNow()}`}
                       {/* Shared on: {new Date(item.created_at * 1000).toString() + ' ' + new Date(item.created_at * 1000).toLocaleTimeString('en-US')} */}
                        {/* Shared by: {item.author} */}
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

