import React, { useState, useEffect} from 'react';
import { 
    Image,
    List,
    ListItem,
    FlatList,
    Text,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
    View
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from "react-redux";
import { API, API_GET_USERS, API_IMAGE_URL } from "../constants/API";
 
import * as theme from '../style/theme';
import { ScrollView } from 'react-native-gesture-handler';



const UserScreen = ({ navigation }) => {

    const token = useSelector((state) => state.auth.token);
    const [ user, setUser ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log("Setting up nav listener");
        // Check for when we come back to this screen
        const removeListener = navigation.addListener("focus", () => {
            console.log("Running nav listener");
            getUsers();
        });
        getUsers();
        return removeListener;
    }, []);
    
    async function getUsers() {
        
        try {
            const response = await axios.get(API + API_GET_USERS, {
                headers: { Authorization: `JWT ${token}` },
            })
            // console.log(response.data);
            setUser(response.data.users);
            console.log(response.data.users);
            return "completed"

        } catch (error) {
            console.log(error)
            console.log(error.response.data);
            if (error.response.data.error = "Invalid token") {
                navigation.navigate("SignInSignUp");
            }
        }
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: theme.SIZES.padding,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100
                }}
            >
                <Text
                    style={{
                        color: theme.COLORS.darkGreen, 
                        ...theme.FONTS.largeTitle
                    }}
                >
                    Thank you Chefs
                </Text>
            </View>
        )
    }

    function renderItem({ item }) {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: theme.SIZES.padding,
                    alignItems: 'center',
                    backgroundColor: theme.COLORS.gray2,
                    height: 100,
                    marginTop: 5
                }}
            >
                <View>
                    <Image
                        source={{ uri: API_IMAGE_URL + item.profileImage }}
                        resizeMode="cover"
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginLeft: 25
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            marginLeft: 25,
                            color: theme.COLORS.gray,
                            ...theme.FONTS.h3
                        }}
                    >
                        { item.username }
                    </Text>
                    <Text
                        style={{
                            marginLeft: 25,
                            color: theme.COLORS.gray,
                            fontStyle: 'italic',
                            ...theme.FONTS.h3
                        }}
                    >
                        { item.email }
                    </Text>
                    <Text
                        style={{
                            marginLeft: 25,
                            color: theme.COLORS.gray3,
                            fontStyle: 'italic',
                            ...theme.FONTS.h3
                        }}
                    >
                        {/* { item.date_joined } */}
                        {`Joined since ${moment(item.date_joined).format('DD-MM-YY')}`}
                    </Text>
                    <Text
                        style={{
                            marginLeft: 25,
                            color: theme.COLORS.blue,
                            ...theme.FONTS.h3
                        }}
                    >
                        {item.blogs.length} posts
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.white,
                marginTop: 60
            }}
        >
            <ImageBackground
                source={ require("../assets/user-backgrd.jpg")}
                style={{
                    flex: 1,
                    resizeMode: 'cover'
                }}
            >
                <FlatList
                    data={user}
                    keyExtractor={item => item.id}
                    showVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <View>
                            {renderHeader()}
                        </View>
                    }
                    ListFooterComponent={
                        <View
                            style={{
                                marginBottom: 100
                            }}
                        />
                    }
                />
            </ImageBackground>
          
        </SafeAreaView>
    );
}

export default UserScreen;