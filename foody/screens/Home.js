import React, { useState, useEffect} from 'react';
import {
    View,
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import axios from 'axios';
import { API, API_GET } from "../constants/API";
import { useDispatch, useSelector } from "react-redux";
import CategoryCard from '../components/CategoryCard';
import TreadingCard from '../components/TreadingCard';

import * as theme from '../style/theme';


const Home = ({ navigation, route }) => {

    const username = useSelector((state) => state.accountPref.username)
    const token = useSelector((state) => state.auth.token);
    const profileImage = useSelector((state) => state.accountPref.profileImage);

    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Setting up nav listener");
        // Check for when we come back to this screen
        const removeListener = navigation.addListener("focus", () => {
            console.log("Running nav listener");
            getPosts();
        });
        getPosts();
        return removeListener;
    }, []);
    
    async function getPosts() {
        
        try {
            const response = await axios.get(API + API_GET, {
                headers: { Authorization: `JWT ${token}` },
            })
            console.log(response.data);
            setPosts(response.data.allblogs);
            return "completed"

        } catch (error) {
            console.log(error)
            console.log(error.response.data);
            if (error.response.data.error = "Invalid token") {
                navigation.navigate("SignInSignUp");
            }
        }
    }

    async function onRefresh() {
        setRefreshing(true);
        const response = await getPosts()
        console.log(response.data);
        setRefreshing(false);
      }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: theme.SIZES.padding,
                    alignItems: 'center',
                    height: 80
                }}
            >
                <View
                style={{
                    flex: 1
                }}
                >
                    <Text
                    style={{
                        color: theme.COLORS.darkGreen,
                        ...theme.FONTS.h2
                    }}
                    >
                        Hello {username}
                    </Text>
                    <Text
                    style={{
                        marginTop: 3,
                        color: theme.COLORS.gray,
                        ...theme.FONTS.h3
                    }}
                    >
                        What's Cooking?
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => consolelog("Profile")}
                >
                    <Image
                        source={{ uri: profileImage }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderSearchBar() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    marginHorizontal: theme.SIZES.padding,
                    paddingHorizontal: theme.SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: theme.COLORS.lightGray
                }}
            >
                <Image 
                    source={require('../assets/icons/seo.png')}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: theme.COLORS.gray
                    }}
                />
                <TextInput
                    style={{
                        marginLeft: theme.SIZES.radius,
                        ...theme.FONTS.body3
                    }}
                    placeholderTextColor={theme.COLORS.gray}
                    placeholder="Search Recipes"
                />
            </View>
        )
    }

    function renderTreadingSection(){
        return (
            <View
                style={{
                    marginTop: theme.SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginHorizontal: theme.SIZES.padding,
                        ...theme.FONTS.h2
                    }}
                >
                    Treading Recipe
                </Text>
                <FlatList
                    data={posts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => {
                        
                        return (
                            <TreadingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? theme.SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => navigation.navigate("Recipe", {item})}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    function renderCategoryHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginHorizontal: theme.SIZES.padding
                }}
            >
                <Text
                    styles={{
                        flex: 1,
                        ...theme.FONTS.h2
                    }}
                >
                    Categories
                </Text>
                <TouchableOpacity>
                    <Text
                        style={{
                            color: theme.COLORS.gray,
                            ...theme.FONTS.body5
                        }}
                    >
                        View All
                    </Text>
                </TouchableOpacity>
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
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={
                    <View>
                        {renderHeader()}
                       
                        {renderSearchBar()}
                        
                        {renderTreadingSection()}

                        {renderCategoryHeader()}
                    </View>
                }
                renderItem={({ item }) => {
                    console.log("item is",item);
                    return (
                        <CategoryCard
                            containerStyle={{
                                marginHorizontal: theme.SIZES.padding
                            }}
                            categoryItem={item}
                            onPress={() => navigation.navigate
                            ("Recipe", { recipe: item })}
                        />
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 60
                        }}
                    />
                }
            >

            </FlatList>
        </SafeAreaView>
    )
}

export default Home;