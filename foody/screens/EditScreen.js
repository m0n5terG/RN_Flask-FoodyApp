import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Button,
    TextInput
 } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { API, API_POSTS, API_IMAGE_URL, API_EDIT } from "../constants/API";
import { useSelector } from "react-redux";

import * as theme from '../style/theme';

const EditScreen = ({ navigation, route }) => {

    const token = useSelector((state) => state.auth.token);
    
    const [title, setTitle] = useState("");
    const [instruction, setInstruction] = useState("");
    const [image, setImage] = useState("");
    const [serving, setServing] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState(""); 
    const [errorText, setErrorText] = useState("");
    
    useEffect(() => {
        let { recipe } = route.params
        setImage(recipe.image)
        setTitle(recipe.title)
        setCategory(recipe.category)
        setInstruction(recipe.instruction)
        setServing(recipe.serving)
        setDuration(recipe.duration)
        setIngredients(recipe.ingredients)
        console.log(recipe.serving)
        
    }, [])

    async function updatePost() { 

        console.log("--- Update ---")
        const recipe = {
            "title": title,
            "category": category,
            "instruction": instruction,
            "ingredients": ingredients,
            "duration":  duration,
            "serving": serving,
            "image": image
        }
        const id = route.params.recipe.id
        
        try {
            const response = await axios.put(API + API_EDIT + id, recipe,
                {
                    headers: { Authorization: `JWT ${token}` },
                }
            );
            console.log("Update success!");
            console.log(response.data);
 
            navigation.push('Recipe', { recipe: recipe });
        } 
        catch (error) {
        console.log(error.response);
        setErrorText(error.response.data.content);
        }    
    }
    

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                await ImagePicker.requestCameraPermissionsAsync();
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            }
        })();
    }, []);

    const LaunchCamera = async () => {
        var cameraResponse = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (cameraResponse.cancelled) {
            return;
        }
    
        const FormattedImage = await ImageManipulator.manipulateAsync(
            cameraResponse.localUri || cameraResponse.uri,
            [{resize: { width: 1000, height: 600, }}],
            {compress: 1, base64: true}
        );
    
            setImage(FormattedImage.base64);
    };
    
    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (result.cancelled) {
            return;
           
        }
    
        const FormattedImage = await ImageManipulator.manipulateAsync(
            result.localUri || result.uri,
            [{resize: { width: 1000, height: 600, }}],
            {compress: 1, base64: true}
        );
    
        setImage(FormattedImage.base64);
    };

    
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.white,
                }}
        >
            <View
                style={{
                    elevation: 2,
                    width: '100%',
                    height: 300,
                    position: 'relative',
                    backgroundColor: "#efefef",
                    overflow: 'hidden'
                }}
            >
                { 
                    image == null ?
                    (<Image source={{ uri: API_IMAGE_URL + image }} 
                        style={{ width: '100%', height: 300}} />) :
                    (<Image source={{ uri: "data:image/jpg;base64," + image }} 
                        style={{ width: '100%', height: 300}} />)
                }
                {/* {
                    image && <Image source={{ uri: "data:image/jpg;base64," + image }} 
                    style={{ width: '100%', height: 300}} />
                } */}
                <View
                    style={{
                        position:'absolute',
                        paddingVertical: 5,
                        bottom:0,
                        backgroundColor: theme.COLORS.transparentBlack3,
                        width:'100%',
                        height:'20%',
                    }}
                >
                    <TouchableOpacity 
                        onPress={addImage}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: theme.COLORS.white
                            }}
                        >{image ? "Edit" : "Upload"} Image</Text>
                        <Image 
                            source={require('../assets/icons/addphoto.png')}
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}
            >
                <TextInput
                    label="Title"
                    value={title}
                    autoCapitalize={true}
                    onChangeText={text => setTitle(text)}
                    style={{
                        marginBottom: 10
                    }}
                />
                <TextInput
                    label="Category"
                    value={category}
                    autoCapitalize={true}
                    onChangeText={text => setCategory(text)}
                    style={{
                        marginBottom: 10
                    }}
                />
                <TextInput
                    label="Instruction"
                    value={instruction}
                    multiline={true}
                    onChangeText={text => setInstruction(text)}
                    style={{
                        marginBottom: 10
                    }}
                />
                <TextInput
                    label="Ingredients"
                    value={ingredients}
                    multiline={true}
                    onChangeText={text => setIngredients(text)}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20
                }}
            >
                <TextInput
                    label="Serving"
                    value={serving}
                    placeholder="1-6"
                    onChangeText={text => setServing(text)}
                    style={{
                        width: 100
                    }}
                />
                <TextInput
                    label="Duration"
                    value={duration}
                    placeholder="in minutes"
                    onChangeText={text => setDuration(text)}
                    style={{
                        width: 100
                    }}
                />
            </View>
            <View
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                }}
            >
                {/* <Text style={{ paddingBottom: 10}}>Category</Text>
            <DropDownPicker
                    open={open}
                    value={value}
                    items={category}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setCategory}
                /> */}
                
                <Button 
                    mode="contained" 
                    onPress={updatePost}
                    style={{
                        marginTop: 20
                    }}
                >
                    Update
                </Button>
                <Text 
                    style={{
                        marginTop: 20,
                        alignItems: 'center',
                        color: theme.COLORS.red
                    }}
                >
                    {errorText}
                </Text>
            </View>
            
            
            
        </SafeAreaView>
    )
}

export default EditScreen;