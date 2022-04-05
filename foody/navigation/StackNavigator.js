import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Index from '../screens/Index';
import SearchScreen from '../screens/SearchScreen';
import EditScreen from '../screens/EditScreen';
import RecipeScreen from '../screens/RecipeScreen';
import CreateScreen from '../screens/CreateScreen';
import GalleryScreen from '../screens/GalleryScreen';
// import CamScreen from '../screens/Camera';
// import CameraP from '../screens/CameraP';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator(); 

export function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName='Index'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Index' 
                component={Index}
            />
            <Stack.Screen
                name='Recipe' 
                component={RecipeScreen}
            />

            <Stack.Screen
                name='Edit' 
                component={EditScreen}
            />
            <Stack.Screen
                name='Search' 
                component={SearchScreen}
            />
        </Stack.Navigator>
    );
};

export function GalleryStack() {
    return (
        <Stack.Navigator
            initialRouteName='GalleryS'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='GalleryS' 
                component={GalleryScreen}
            />
            
            <Stack.Screen
                name='Add' 
                component={CreateScreen}
            />
        </Stack.Navigator>
    );
};

export function SettingStack () {
    return (
        <Stack.Navigator 
            initialRouteName='Profile'
            screenOptions={{
                
            }}
        >
            <Stack.Screen
                name='Profile' 
                component={ProfileScreen}
                options={{
                    headerLeft: null
                }}

            />
            <Stack.Screen
                name='EditProfile' 
                component={EditProfileScreen}
            />
            {/* <Stack.Screen
                name='CameraP' 
                component={CameraP}
                options={{
                    headerTintColor: COLORS.transparentBlack1
                }}
            /> */}
        </Stack.Navigator>
    )
}

export function ChefStack () {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Chef' 
                component={UserScreen}
            />
        </Stack.Navigator>
    )
}
