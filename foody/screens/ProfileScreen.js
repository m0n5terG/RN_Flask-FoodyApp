import React, { useCallback, useEffect, useState } from "react";
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
    TouchableWithoutFeedback 
} from "react-native";
import moment from 'moment';
import axios from "axios";
import { API, API_EDIT_PROFILE, API_GET_ME, API_IMAGE_URL, API_WHOAMI } from "../constants/API";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { logOutAction } from "../redux/ducks/blogAuth";
import { useDispatch, useSelector } from "react-redux";

import TreadingCard from '../components/TreadingCard';
import login from "../constants/loggedInUser";

import * as theme from '../style/theme';
// import { useFocusEffect } from "@react-navigation/native";

const wait = (timeout) => {
    return new Promise(resolve =>
        setTimeout(resolve, timeout));
}

function ProfileScreen ({ navigation, route }) {
    
    const user_id = useSelector((state) => state.accountPref.user_id);
    const token = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.accountPref.username);
    const profileImage = useSelector((state) => state.accountPref.profileImage);
    const date_joined = useSelector((state) => state.accountPref.date_joined);
    // const blogs = useSelector((state) => state.accountPref.blogs);
    const count = useSelector((state) => state.accountPref.count);
    
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [blogs, setBlogs] = useState();
    const [user, setUser] = useState("");


    async function getUser() {
        const id = user_id
        
        try {
            const response = await axios.get(API + API_WHOAMI, {
                headers: { Authorization: `JWT ${token}` },
            })
            console.log(response.data.blogs);
            setBlogs(response.data.blogs);
            setUser(response.data)
            console.log(user);
            return "completed"

        } catch (error) {
            console.log(error)
            console.log(error.response.data);
            if (error.response.data.error = "Invalid token") {
                navigation.navigate("LoginSignUp");
            }
        }
    }

    // const picSize = new Animated.Value(0);
    // const sizeInterpolation = {
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [200, 300, 200]
    // }

    // useEffect(() => {
    //     setBlogData(state.accountPref.blogs.data)
    // }, []);

    async function onRefresh() {
        setRefreshing(true);
        const response = await getUser()
        console.log(response.data);
        setRefreshing(false);
    }

    useEffect(() => {
        console.log("Setting up nav listener");
        const removeListener = navigation.addListener("focus", () => {
            console.log("Running nav listener");
            getUser();
        });
        getUser();
        return removeListener;
    }, []);

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

    // function changePicSize() {
    //     Animated.loop(
    //         Animated.timing(picSize, {
    //             toValue: 1,
    //             duration: 1000,
    //             useNativeDriver: false
    //         }),
    //     ).start()
    // }

    function renderTreadingSection(){
        return (
            <View
                style={{
                    marginTop: 10
                }}
            >
                <Text
                    style={{
                        marginHorizontal: theme.SIZES.padding,
                        ...theme.FONTS.h3
                    }}
                >
                    My Posting
                </Text>
                <FlatList
                    data={blogs} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        // console.log(item.id);
                        return (
                            <View>
                            <TreadingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? theme.SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => navigation.navigate('Recipe', {recipe: item})}
                            />
                            </View>
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
            <ScrollView
                style={{
                    flex: 1,
                    marginTop: 10
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}   
                />}
            >
                <View style={{ alignSelf: "center" }}>
                    <View style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        overflow: "hidden"
                    }}>
                        <Image 
                            source={{ uri: profileImage }} 
                            // resizeMode="center"
                            style={{
                                flex: 1,
                                height: undefined,
                                width: undefined
                            }} 
                        />
                    </View>
                    <View
                        style={styles.add}
                    >
                        <TouchableWithoutFeedback       
                            onPress={() => navigation.navigate("EditProfile", {userData: user})}
                        >
                            <Ionicons 
                                name="ios-add" 
                                size={36} 
                                color="#DFD8C8" 
                                style={{ 
                                    marginTop: 2, 
                                    marginLeft: 2,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View 
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: 5
                }}>
                    <Text style={{ color: theme.COLORS.blue, ...theme.FONTS.h1 }}>{username}</Text>
                    <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Date Joined</Text>
                    <Text style={{ color: theme.COLORS.lightGray2, ...theme.FONTS.body4 }}>{moment(date_joined).format("DD-MM-YYYY")}</Text>
                </View>

                <View 
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10
                    }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: theme.COLORS.gray, ...theme.FONTS.h2 }}>{count}</Text>
                        <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Posts</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text style={{ color: theme.COLORS.gray, ...theme.FONTS.h2 }}>45,844</Text>
                        <Text style={{ color: theme.COLORS.gray3, ...theme.FONTS.subText }}>Followers</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
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
    add: {
        backgroundColor: theme.COLORS.transparentBlack5,
        position: "absolute",
        left: 140,
        bottom: 5,
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default ProfileScreen;
