import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeStack } from "./StackNavigator";
import { GalleryStack } from "./StackNavigator";
import { SettingStack } from "./StackNavigator";
import { ChefStack } from "./StackNavigator";

import * as theme from '../style/theme';
import TabIcon from "../components/TabIcon";


const Tab = createBottomTabNavigator()

const MainStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: theme.COLORS.white,
                    borderTopColor: "transparent",
                    height: 100
                }
            })}
        >
            <Tab.Screen
                name="Index"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/home.png')} />
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={GalleryStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/recipe.png')} />
                }}
            />
            <Tab.Screen
                name="Chefs"
                component={ChefStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/chef.png')} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={SettingStack}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/profile.png')} />
                }}
            />
        </Tab.Navigator>
    )
}

export default MainStack;