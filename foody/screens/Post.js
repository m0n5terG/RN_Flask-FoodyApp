import React, { useState } from 'react';
import {
    Button,
    SafeAreaView,
    FlatList,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { API, API_POSTS } from "../constants/API";
import { useSelector } from "react-redux";

import * as theme from '../style/theme';

const Post = ({ navigation }) => {

    const [title, setTitle] = useState("");
    const [instruction, setInstruction] = useState("");
    const [image, setImage] = useState("");
    const [serving, setServing] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [ingredients, setIngredients] = useState(""); 
    const [errorText, setErrorText] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Pasta', value: 'pasta'},
        {label: 'Chinese', value: 'chinese'},
        {label: 'Japanese', value: 'jasta'},
        {label: 'Local', value: 'local'},
        {label: 'Western', value: 'western'},
    ]);

    async function savePost() { 

        console.log("--- Post ---")
    
        if (title == "" || content == "") {
          setErrorText("Input cannot be blank");
        }
        else {
            try {
                const response = await axios.post(API + API_CREATE,
                    {
                        title,
                        category,
                        category_id,
                        instruction,
                        serving,
                        duration,
                        ingredients,
                        image  
                    },
                    {
                    headers: { Authorization: `JWT ${token}` },
                    }
                );
                console.log("Post success!");
                console.log(response.data);
     
                navigation.navigate('Index', { post: post });
            } 
            catch (error) {
            console.log(error.response);
            setErrorText(error.response.data.content);
            }
        }
    }

    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.white
            }}
        >
            {/* <FlatList
                data={posts}
                keyExtractor={item => item.id}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        
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
                            marginBottom: 100
                        }}
                    />
                }
            >

            </FlatList> */}
        </SafeAreaView>
    )
}

export default Post;