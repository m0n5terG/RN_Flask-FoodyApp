import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import store from "./redux/configureStore";

import Landing from "./screens/Landing";
import LoginSignup from "./screens/LoginSignup";
import { ActivityIndicator, View } from "react-native";
import MainStack from "./navigation/TabNavigator";

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
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="Home" component={MainStack} />
                <Stack.Screen name="LoginSignup" component={LoginSignup} />
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
