import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import store from "./redux/configureStore";

import LandingScreen from "./screens/LandingScreen";
import LoginSignupScreen from "./screens/LoginSignupScreen";
import { ActivityIndicator, View } from "react-native";
import AppStack from "./navigation/TabNavigator";

const Stack = createStackNavigator();

function App() {
    
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);

    function loadToken() {
        if (token != null) {
            setLogin(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadToken();
    }, []);
  
    return loading ? (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ActivityIndicator />
        </View>
    ) : (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={"Landing"}
            >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="AppStack" component={AppStack} />
                <Stack.Screen name="LoginSignup" component={LoginSignupScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    }

export default function AppWrapper() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
