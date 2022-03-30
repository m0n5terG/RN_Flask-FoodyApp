import React, {useState, useEffect, useRef} from 'react';
import {
    Animated,
    FlatList,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Avatar,
    Card,
    Title,
    Paragraph,
    List
 } from 'react-native-paper';
import moment from 'moment';
// import ImageLoad from 'react-native-image-placeholder';
import { BlurView } from 'expo-blur';

import * as theme from '../style/theme';
import { API, API_GET_FB, API_IMAGE_URL } from '../constants/API';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const HEADER_HEIGHT = 350;


const Recipe = ({ route }) => {

    const [selectedRecipe, setSelectedRecipe] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState([]);
    const [instruction, setInstruction] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] =useState([]);
    const scrollY = useRef(new Animated.Value(0)).current;
    const username = useSelector((state) => state.accountPref.username)
    const token = useSelector((state) => state.auth.token);
    const profileImage = useSelector((state) => state.accountPref.profileImage)

    const dispatch = useDispatch();

    useEffect(() => {
        let { recipe } = route.params
        setSelectedRecipe(recipe)
        setSelectedRecipeId(recipe.id)
        setComments(recipe.comments)
        setLikes(recipe.likes)
    }, [])
    console.log(selectedRecipe.instruction);

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: theme.COLORS.white,
                marginTop: -500,
                paddingTop: 500,
                overflow: 'hidden'
            }}
        >
               <Card
                // style={{
                    
                // }}
               >
                    <Image
                       style={{ 
                           width: '100%', 
                           height: 350 }}
                       source={{ uri: API_IMAGE_URL + selectedRecipe.image }}
                   />
                   <Card.Content
                    style={{
                        marginTop: 30,
                        marginBottom: -40
                    }}
                   >
                       <Title>{selectedRecipe.title}</Title>
 
                       <List.Item
                           title={`by: ${selectedRecipe.author}`}
                        //    description={selectedRecipe.instruction}
                           left={props => {
                               return (
                                   <Avatar.Image
                                       size={55}
                                       source={{
                                           uri: API_IMAGE_URL + profileImage
                                       }}
                                   />
                               );
                           }}
                       />
                       {/* <List.Item
                        title={selectedRecipe.serving}
                       />
                       <List.Item
                        title={selectedRecipe.duration}
                        /> */}
                       <List.Item
                           title={`Posted ${moment(
                               selectedRecipe.created_at,
                               'YYYYMMDD',).fromNow()}`}
                       />
                       <Paragraph />
                   </Card.Content>
                   
               </Card>

           </ScrollView>
    )
    // function renderRecipeCardHeader() {
    //     return (
    //         <View
    //             style={{
    //                 alignItems: 'center'
    //             }}
    //         >
    //             <Image
    //                 source={{uri: API_IMAGE_URL + selectedRecipe.image}}
    //                 resizeMode="contain"
    //                 style={{
    //                     height: HEADER_HEIGHT,
    //                     width: "200%",
                        // transform: [
                        //     {
                        //         translateY: scrollY.interpolate({
                        //             inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        //             outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                        //         })
                        //     },
                        //     {
                        //         scale: scrollY.interpolate({
                        //             inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        //             outputRange: [2, 1, 0.75]
                        //         })
                        //     }
                        // ]
    //                 }}
    //             />
    //             <View
    //                 style={{
    //                     position: 'absolute',
    //                     bottom: 10,
    //                     left: 30,
    //                     right: 30,
    //                     height: 80
    //                 }}
    //             >

    //                 {/* <RecipeAurthorCardInfo 
    //                     selectedRecipe={selectedRecipe}
    //                 /> */}
    //             </View>
    //         </View>
    //     )
    // }

    // return (
    //     <View
    //         style={{
    //             flex: 1,
    //             backgroundColor: theme.COLORS.white,
    //         }}
    //     >
    //         <FlatList
    //             data={selectedRecipe?.id} 
    //             keyExtractor={item => item.id}
    //             showsVerticalScrollIndicator={false}
    //             ListHeaderComponent={
    //                 <View>
                        {/* Header */}
                        // {renderRecipeCardHeader()}

                        {/* info */}

                        {/* Ingredients item */}
                //     </View>
                // }
                // scrollEventThrottle={16}
                // onscroll={Animated.event([
                //     { nativeEvent: {contentOffset: { y: scrollY }}}
                // ], { useNativeDriver: true })}
                // renderItem={({ item }) => (
                //     <View>
                        {/* <Text>{item.author}</Text> */}
//                     </View>
//                 )}
//             />
            
//         </View>
//     )
}

export default Recipe;