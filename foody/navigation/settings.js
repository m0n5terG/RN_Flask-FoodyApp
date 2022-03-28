import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import CamScreen from '../screens/Camera';

const Stack = createStackNavigator();

export default function Settings() {
    return (
        <Stack.Navigator>
            <Stack.Screen component={Profile} name="Profile" options={{
                title: "Profile",
                headerLeft: null
            }}
            />
            <Stack.Screen component={EditProfile} name="Edit Profile" options={{
                title: "EditProfile",
                headerLeft: null
            }}
            />
            <Stack.Screen component={CamScreen} name="CamScreen" options={{
                title: "Take a photo",  
            }}
            />
        </Stack.Navigator>
    )
}
