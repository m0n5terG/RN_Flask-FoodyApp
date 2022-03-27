import React, { useState, useEffect, useCallback } from "react";
import { 
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl, 
    TouchableOpacity, 
    Text, 
    View,
    SafeAreaView, 
    Switch,
    ScrollView,
    StyleSheet, 
    Animated, 
    TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { commonStyles, lightStyles, darkStyles } from "../styles/commonStyles";
import axios from "axios";
import { API, API_SIGNUP, API_WHOAMI } from "../constants/API";
import { logOutAction } from "../redux/ducks/blogAuth";
import { changeModeAction, deletePicAction } from '../redux/ducks/accountPref';
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TreadingCard from '../components/TreadingCard';

import * as theme from '../style/theme';

function Profile ({ navigation }) {
    
    const username = useSelector((state) => state.accountPref.username);
    const profileImage = useSelector((state) => state.accountPref.profileImage);
    const date_joined = useSelector((state) => state.accountPref.date_joined);
    const blogs = useSelector((state) => state.accountPref.blogs);
    const count = useSelector((state) => state.accountPref.count);
    
    const dispatch = useDispatch();

    // const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };

    const picSize = new Animated.Value(0);
    const sizeInterpolation = {
        inputRange: [0, 0.5, 1],
        outputRange: [200, 300, 200]
    }  

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={signOut}>
                  <MaterialCommunityIcons name="logout" size={30} style={{ marginRight: 15 }} />
                </TouchableOpacity>
            ),
        });
    });
  
    function signOut() {
        dispatch(logOutAction())
        navigation.navigate("Landing");
    }

    // function switchMode() {
    //   dispatch(changeModeAction())
    //   console.log(isDark)
    // }

    function changePicSize() {
        Animated.loop(
            Animated.timing(picSize, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false
            }),
        ).start()
    }
    function renderTreadingSection(){
        return (
            <View
                style={{
                    marginTop: theme.SIZES.padding,
                }}
            >
                <Text
                    style={{
                        marginHorizontal: theme.SIZES.padding,
                        ...theme.FONTS.h2
                    }}
                >
                    My Posting
                </Text>
                <FlatList
                    data={blogs}
                    horizontal
                    showsHorizontalScrollIndicator={true}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        console.log("item is",item);
                        return (
                            <TreadingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? theme.SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => navigation.navigate("Recipe", {recipe: item})}
                            />
                        )
                    }}
                />
            </View>
        )
    }

  return (
      <SafeAreaView 
          style={{
            flex: 1,
            backgroundColor: theme.COLORS.white
          }}
      >
            <ScrollView>
                <View style={{ alignSelf: "center", marginTop: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: profileImage }} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={36} color="#DFD8C8" style={{ marginTop: 2, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={{ color: theme.COLORS.blue, ...theme.FONTS.h1 }}>{username}</Text>
                    <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Date Joined</Text>
                    <Text style={{ color: theme.COLORS.lightGray2, ...theme.FONTS.body4 }}>{date_joined}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={{ color: theme.COLORS.gray, ...theme.FONTS.h2 }}>{count}</Text>
                        <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={{ color: theme.COLORS.gray, ...theme.FONTS.h2 }}>45,844</Text>
                        <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={{ color: theme.COLORS.gray, ...theme.FONTS.h2 }}>302</Text>
                        <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Following</Text>
                    </View>
                </View>

                <View>
                    {renderTreadingSection()}
                </View>
            </ScrollView>
        </SafeAreaView>    
    );
}
const styles = StyleSheet.create({
  
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    add: {
        backgroundColor: theme.COLORS.transparentBlack5,
        position: "absolute",
        bottom: 0,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
});

export default Profile;
