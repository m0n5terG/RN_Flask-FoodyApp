import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    
    TouchableOpacity,
    UIManager,
    LayoutAnimation,
    ActivityIndicator,
    Keyboard,
} from "react-native";
import { API, API_LOGIN, API_SIGNUP } from "../constants/API";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logInAction } from "../redux/ducks/blogAuth";
import loggedInUser from "../constants/loggedInUser";
import { TextInput, } from "react-native-paper";

import * as theme from "../style/theme";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
    ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

function LoginSignupScreen({ navigation }) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();

    async function login() {
        console.log("---- Login time ----");
        Keyboard.dismiss();
    
        try {
            setLoading(true);
            const response = await axios.post(API + API_LOGIN, {
                username,
                password,
            });
            console.log("Success logging in!");
            console.log(response.data.access_token);
        
            dispatch({ ...logInAction(), payload: response.data.access_token });
        
            loggedInUser(dispatch, response.data.access_token);
        
            setUsername("");
            setPassword("");
            setLoading(false);

            navigation.navigate("AppStack");

            } catch (error) {
            setLoading(false);
            console.log("Error logging in!");
            console.log(error);
            setErrorText(error.response.data.description);
            }
        }

        async function signUp() {
            if (password != confirmPassword) {
                setErrorText("Your passwords don't match. Check and try again.");
            } else {
                try {
                    setLoading(true);
                    const response = await axios.post(API + API_SIGNUP, {
                    username,
                    email,
                    password,
                    });
                    if (response.data.Error) {
                    // We have an error message for if the user already exists
                    setErrorText(response.data.Error);
                    setLoading(false);
                    } else {
                    console.log("Success signing up!");
                    setLoading(false);
                    login();
                    }
                } catch (error) {
                    setLoading(false);
                    console.log("Error logging in!");
                    console.log(error.response);
                    setErrorText(error.response.data.description);
                    if ((error.response.status = 404)) {
                    setErrorText("No such User!");
                    }
                }
            }
        }

    function renderInput () {

        const [eye, setEye] = useState(true);
        const [eye1, setEye1] = useState(true);

        return (     
            <View 
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        width: 300,
                        height: 50,
                        marginTop: 30,                 
                    }}
                >
                    <TextInput
                        placeholder="Enter your name"
                        value={username}
                        mode='outlined'
                        label="User Name"
                        autoCapitalize="none"
                        right={<TextInput.Icon name="account"/>}
                        activeOutlineColor="#2AD699"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>
                {isLogin ? (
                    <View />
                    ) : (
                        <View
                            style={{
                                width: 300,
                                height: 50,
                                marginTop: 30
                            }}
                        >
                            <TextInput
                                placeholder="Enter email here"
                                value={email}
                                mode='outlined'
                                autoCapitalize="none"
                                label="Email"
                                right={<TextInput.Icon name="email"/>}
                                activeOutlineColor="#2AD699"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>
                )}    
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
                    {isLogin ? (
                        <View />
                        ) : (
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
                    )}
                    <View />
                    <View
                        style={{
                            marginTop: 40
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: theme.COLORS.lightGreen1,
                                borderRadius: 12,
                                height: 45
                            }}
                            onPress={isLogin ? login : signUp}
                        >
                            <Text 
                                style={{
                                    fontSize: 20,
                                    paddingVertical: 10,
                                    color: theme.COLORS.white2,
                                    alignSelf: 'center',
                                }
                                }>
                                    {" "} {isLogin ? "Log In" : "Sign Up"} {" "}
                            </Text>
                            </TouchableOpacity>
                            {loading ? (
                                <ActivityIndicator color="#0000ff" style={{ marginLeft: 10 }} />                                
                                ) : (
                        <View />
                            )}
                    </View>
                    <View>
                        
                    </View>
                        
            </View>    
            
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.lightGray,
                marginTop: -50,
                marginBottom: -30
            }}
        >
            <StatusBar style='auto' />
            <ImageBackground
                source={ require("../assets/user-backgrd.jpg")}
                style={{
                    flex: 1,
                    resizeMode: 'cover'
                }}
            >
                <View style={{
                    alignItems: 'center',
                    marginTop: 200
                }}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            ...theme.FONTS.largeTitle
                        }}
                    >
                        {isLogin ? "Log In" : "Sign Up"}
                    </Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {renderInput()}
                    
                </View>
                <View
                    style={{
                        top: 400,
                        alignItems: 'center'
                    }}
                >
                    <Text 
                        style={{
                            ...theme.FONTS.body4,
                            color: theme.COLORS.red,
                        }}
                    >
                        {errorText}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                        LayoutAnimation.configureNext({
                            duration: 700,
                            create: { type: "linear", property: "opacity" },
                            update: { type: "spring", springDamping: 0.4 },
                        });
                        setIsLogin(!isLogin);
                        setErrorText("");
                        }}
                    >
                        <Text style={{
                            ...theme.FONTS.body2,
                            fontWeight: "400",
                            marginTop: 20,
                            color: theme.COLORS.white,
                            backgroundColor: theme.COLORS.transparentGray,
                        }}>
                            {" "} {isLogin ? "No account? Sign up now." : "Already have an account? Log in here."}
                        </Text>
                    </TouchableOpacity>
                </View>                       
            </ImageBackground>
        </SafeAreaView>
    )
}

export default LoginSignupScreen;