import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as theme from '../style/theme';
import CustomButtom from '../components/CustomButton';
// import LoginSignup from '../screens/Login'

const LandingScreen = ({ navigation }) => {

    function renderHeader() {
        return (
            <View
                style={{
                    height: theme.SIZES.height > 700 ? "65%" : "60%"
                }}
            >
                <ImageBackground
                    source={require("../assets/login-background.png")}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}
                    resizeMode="cover"
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={[
                            theme.COLORS.transparent,
                            theme.COLORS.black
                        ]}
                        style={{
                            height: 200,
                            justifyContent: 'flex-end',
                            paddingHorizontal: theme.SIZES.padding
                        }}
                    >
                        <Text
                            style={{
                                width: "80%",
                                color: theme.COLORS.white,
                                ...theme.FONTS.largeTitle,
                                lineHeight: 45
                            }}
                        >
                            Cooking a Delicious Home Cooked Meal
                        </Text>

                    </LinearGradient>

                </ImageBackground>

            </View>
        )
    }

    function renderDeatils() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: theme.SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginTop: theme.SIZES.radius,
                        width: "70%",
                        color: theme.COLORS.gray,
                        ...theme.FONTS.body3
                    }}
                >
                    Share and discover food recipes with others from your handheld and cook it!

                </Text>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <CustomButtom
                        buttonText="Login"
                        buttonContainerStyle={{
                            paddingVertical: 18,
                            borderRadius: 20
                        }}
                        colors={[theme.COLORS.darkGreen, theme.COLORS.lime]}
                        onPress={() => navigation.replace("LoginSignup")}
                    />
                </View>


            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.black
            }}
        >
            <StatusBar barStyle='light-content' />
            {/* Header */}
            {renderHeader()}

            {/* Detail */}
            {renderDeatils()}
        </View>
    )
}

export default LandingScreen;