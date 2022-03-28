import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SearchScreen from '../screens/Search';
import Edit from '../screens/Edit';
import Recipe from '../screens/Recipe';
import CreateScreen from '../screens/Create';

const InnerStack = createStackNavigator(); 

export default function MainStack() {
    return (
        <InnerStack.Navigator mode='modal'>
            <InnerStack.Screen
                name='Home' 
                component={Home}
                option={{ title: "Home", ...headerOptions }} 
            />
            <InnerStack.Screen
                name='Create' 
                component={CreateScreen}
                option={{ title: "Share", ...headerOptions }}
            />
            <InnerStack.Screen
                name='Edit'
                component={Edit}
                option={{ title: "Edit", ...headerOptions }}
            />
            <InnerStack.Screen
                name='Recipe' 
                component={Recipe}
                option={{ title: "Recipe", ...headerOptions }}
            />
            {/* <InnerStack.Screen
                name='Search' 
                component={SearchScreen}
                option={{ title: "Search", ...headerOptions }}
            /> */}
        </InnerStack.Navigator>
    )
}


