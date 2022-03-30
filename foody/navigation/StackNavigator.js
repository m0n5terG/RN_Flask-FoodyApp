import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Edit from '../screens/Edit';
import Recipe from '../screens/Recipe';
import Create from '../screens/Create';
import Gallery from '../screens/Gallery';
import CamScreen from '../screens/Camera';
import CameraP from '../screens/CameraP';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Chef from '../screens/Chef';
import { COLORS } from '../style/theme';

const Stack = createStackNavigator(); 

export function HomeStack() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Home' 
                component={Home}
            />
            <Stack.Screen
                name='Recipe' 
                component={Recipe}
            />
            <Stack.Screen
                name='Search' 
                component={Search}
            />
        </Stack.Navigator>
    );
};

export function GalleryStack() {
    return (
        <Stack.Navigator 
            mode='modal'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Gallery' 
                component={Gallery}
            />
            <Stack.Screen
                name='Create' 
                component={Create}
            />
            <Stack.Screen
                name='Edit' 
                component={Edit}
            />
            <Stack.Screen
                name='CamScreen' 
                component={CamScreen}
            />
        </Stack.Navigator>
    );
};

export function SettingStack () {
    return (
        <Stack.Navigator 
            // mode='modal'
            screenOptions={{
                
            }}
        >
            <Stack.Screen
                name='Profile' 
                component={Profile}
                options={{
                    headerLeft: null
                }}

            />
            <Stack.Screen
                name='EditProfile' 
                component={EditProfile}
            />
            <Stack.Screen
                name='CameraP' 
                component={CameraP}
                options={{
                    headerTintColor: COLORS.transparentBlack1
                }}
            />
        </Stack.Navigator>
    )
}

export function ChefStack () {
    return (
        <Stack.Navigator 
            mode='modal'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Chef' 
                component={Chef}
            />
        </Stack.Navigator>
    )
}
