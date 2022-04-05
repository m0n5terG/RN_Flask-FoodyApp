import React from 'react';
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    ImageBackground,
    SafeAreaView
} from 'react-native';
import axios from "axios";
import { API, API_EDIT_PROFILE, API_IMAGE_URL } from "../constants/API";
import { useDispatch, useSelector } from "react-redux";

import * as theme from '../style/theme';


const EditProfileScreen = () => {

    const username = useSelector((state) => state.accountPref.username);
    const profileImage = useSelector((state) => state.accountPref.profileImage);

    const dispatch = useDispatch();

    return (
        <SafeAreaView
            style={{
                flex: 0.9,
                backgroundColor: theme.COLORS.lightGray,
                
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
            </ImageBackground>
        </SafeAreaView>
    )
}

export default EditProfileScreen;