import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../screens/Home';
import Settings from './settings';
import Gallery from '../screens/Gallery'
import Chef from "../screens/Chef";

import * as theme from '../style/theme';
import TabIcon from "../components/TabIcon";


const Tab = createBottomTabNavigator()

const Tabs = () => {
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
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/home.png')} />
                }}
            />
            <Tab.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/recipe.png')} />
                }}
            />
            <Tab.Screen
                name="Chefs"
                component={Chef}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/chef.png')} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon focused=
                    {focused} icon={require('../assets/icons/profile.png')} />
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;