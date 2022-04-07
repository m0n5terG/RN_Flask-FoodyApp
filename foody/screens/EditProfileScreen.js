import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {
    View,
    Image,
    Text,
    ImageBackground,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { TextInput, } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from "axios";
import { API, API_EDIT_PROFILE, API_WHOAMI, API_IMAGE_URL } from "../constants/API";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../redux/ducks/blogAuth";

import * as theme from '../style/theme';


const EditProfileScreen = ( navigation, route) => {

    const user_id = useSelector((state) => state.accountPref.user_id);
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.accountPref.username);
    const profileImage = useSelector((state) => state.accountPref.profileImage);

    const dispatch = useDispatch();

    // const {userData} = route.params;
    const [new_username, setNew_Username] = useState("");
    const [new_profileImage, setNew_ProfileImage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [eye, setEye] = useState(true);
    const [eye1, setEye1] = useState(true);

    
    async function editProfile() {
        const userData = {
            "username": new_username,
            "profileImage": new_profileImage,
            "password": password,
        }
        const id = user_id
        console.log(id);
        
        try {
            const response = await axios.put(API + API_EDIT_PROFILE + id, userData,
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            );
            console.log("Update success!");
            console.log(response.data);
 
            navigation.goBack();
        } 
        catch (error) {
            console.log(error.response.data);
            // setErrorText(error.response.data)
            if ((error.response.status = 401)) {
                alert("You're not authorised!")
            }
        }    
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                await ImagePicker.requestCameraPermissionsAsync();
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            }
        })();
    }, []);

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        
        if (result.cancelled) {
            return;
           
        }
    
        const FormattedImage = await ImageManipulator.manipulateAsync(
            result.localUri || result.uri,
            [{resize: { width: 1000, height: 600, }}],
            {compress: 1, base64: true}
        );
    
        setNew_ProfileImage(FormattedImage.base64);
    };

    // useEffect(() => {
    //     // console.log("Setting up nav listener");
    //     // Check for when we come back to this screen
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         console.log("Running nav listener");
    //         getUser();
    //     });
    //     getUser();
    //     return unsubscribe;
    // }, []);
        
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.lightGray,
            }}
        >
            {/* <StatusBar style='auto' /> */}
            
            <ImageBackground
                source={ require("../assets/user-backgrd.jpg")}
                style={{
                    flex: 1
                }}
            >
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <View style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        overflow: "hidden"
                    }}>
                        {
                            profileImage == null ?
                            (<Image 
                                source={{ uri: profileImage }} 
                                // resizeMode="center"
                                style={{
                                    flex: 1,
                                    height: undefined,
                                    width: undefined
                                }} 
                            />) :
                            (<Image 
                                source={{ uri: "data:image/jpg;base64," + new_profileImage }} 
                                // resizeMode="center"
                                style={{
                                    flex: 1,
                                    height: undefined,
                                    width: undefined
                                }} 
                            />)
                        }
                        <View
                    style={{
                        position:'absolute',
                        paddingVertical: 5,
                        bottom:0,
                        backgroundColor: theme.COLORS.transparentBlack3,
                        width:'100%',
                        height:'20%',
                    }}
                >
                    <TouchableOpacity 
                        onPress={addImage}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: theme.COLORS.white
                            }}
                        >{ profileImage ? "Edit" : "Upload"} Image</Text>
                        <Image 
                            source={require('../assets/icons/addphoto.png')}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>      
                    </View>
                    
                </View>
                <View 
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 5
                }}>
                    <Text style={{ color: theme.COLORS.blue, ...theme.FONTS.h1 }}>{username}</Text>
                    {/* <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Date Joined</Text>
                    <Text style={{ color: theme.COLORS.lightGray2, ...theme.FONTS.body4 }}>{moment(date_joined).format("DD-MM-YYYY")}</Text> */}
                    <View
                        style={{
                            width: 300,
                            height: 50,
                            marginTop: 30,                 
                        }}
                    >
                        <TextInput
                            placeholder="Enter your name"
                            value={new_username}
                            mode='outlined'
                            label="User Name"
                            autoCapitalize="none"
                            right={<TextInput.Icon name="account"/>}
                            activeOutlineColor="#2AD699"
                            onChangeText={(username) => setNew_Username(username)}
                        />
                    </View>
                    <View
                        style={{
                                width: 300,
                                height: 50,
                                marginTop: 30
                            }}
                    >
                        <TextInput
                            placeholder="Enter password"
                            value={password}
                            mode='outlined'
                            secureTextEntry={eye}
                            label="Password"
                            right={
                                <TextInput.Icon 
                                    name="eye"
                                    onPress={() => {
                                        setEye(!eye);
                                        return false;
                                    }} 
                                />}
                            activeOutlineColor="#2AD699"
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <View
                        style={{
                            width: 300,
                            height: 50,
                            marginTop: 30
                        }}
                    >
                        <TextInput
                            placeholder="Confirm password"
                            value={confirmPassword}
                            mode='outlined'
                            secureTextEntry={eye1}
                            label="Confirm Password"
                            right={
                                <TextInput.Icon 
                                    name="eye"
                                    onPress={() => {
                                        setEye1(!eye1);
                                        return false;
                                    }} 
                                />}
                            activeOutlineColor="#2AD699"
                            onChangeText={(paasword) => setConfirmPassword(paasword)}
                        />
                    </View>

                </View>

                <View 
                    style={{
                        alignItems: 'center',
                        paddingTop: 50
                    }}>
                    <TouchableOpacity
                            style={{
                                backgroundColor: theme.COLORS.lightGreen1,
                                borderRadius: 12,
                                height: 45
                            }}
                            onPress={editProfile}
                        >
                            <Text 
                                style={{
                                    fontSize: 20,
                                    padding: 10,
                                    color: theme.COLORS.white2,
                                    alignSelf: 'center',
                                }
                                }>
                                    Update
                            </Text>
                        </TouchableOpacity>
                            {loading ? (
                                <ActivityIndicator color="#0000ff" style={{ marginLeft: 10 }} />                                
                                ) : (
                        <View />
                            )}
                </View>                  
            </ImageBackground>
        </SafeAreaView>
    )
}

export default EditProfileScreen;