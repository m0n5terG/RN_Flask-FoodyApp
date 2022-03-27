import React from 'react';
import { 
    Image,
    Platform,
    Text,
    TouchableOpacity,
    StyleSheet,
    View
 } from 'react-native';
 import { BlurView } from 'expo-blur';
 import { API_IMAGE_URL } from "../constants/API";

 import * as theme from '../style/theme';

 const RecipeCardDetails = ({ recipeItem }) => {
     return (
         <View
            style={{
                flex: 1
            }}
         >
             <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
             >
                <Text
                    style={{
                        width: "70%",
                        color: theme.COLORS.white,
                        ...theme.FONTS.h3,
                        fontSize: 18
                    }}
                >
                     {recipeItem.title}
                </Text>
                {/* <Image
                    source={recipeItem.isBookmark ? icons.bookmarkFilled : icon.bookmark}
                    style={{
                        width: 20,
                        height:20,
                        marginRight: theme.SIZES.base,
                        tintColor: theme.COLORS.darkGreen
                    }}
                /> */}
            </View>
            <Text
                style={{
                    color: theme.COLORS.lightGray,
                    ...theme.FONTS.body4
                }}
            >
                 {recipeItem.duration} | {recipeItem.serving} Serving
            </Text>
         </View>
     )
 }

 const RecipeCardInfo = ({ recipeItem }) => {
    if (Platform.OS === 'ios') {    
        return (
            <BlurView
                intensity={50}
                tint="dark"
                style={styles.blurContainer}
            >
                <RecipeCardDetails 
                    recipeItem={recipeItem}
                />
            </BlurView>
        )
    } else {
        return (
            <View
                style={{
                    ...styles.blurContainer,
                    backgroundColor: theme.COLORS.transparentDarkGray
                }}
            >
                <RecipeCardDetails 
                    recipeItem={recipeItem}
                />
            </View>
        )
    }
 }

 const TreadingCard = ({containerStyle, recipeItem, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                height: 350,
                width: 250,
                marginTop: theme.SIZES.radius,
                marginRight: 20,
                borderRadius: theme.SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={{ uri: API_IMAGE_URL + recipeItem.image }}
                resizeMode="cover"
                style={{
                    height: 350,
                    width: 250,
                    borderRadius: theme.SIZES.radius 
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 15,
                    paddingHorizontal: theme.SIZES.radius,
                    paddingVertical: 5,
                    backgroundColor: theme.COLORS.transparentGray,
                    borderRadius: theme.SIZES.radius
                }}
            >
                
                <Text
                    style={{
                        color: theme.COLORS.white,
                        ...theme.FONTS.h4
                    }}
                >
                    {recipeItem.category.name}
                </Text>
            </View>
            <RecipeCardInfo 
                recipeItem={recipeItem} 
            />
        </TouchableOpacity>
    )
 }

 const styles = StyleSheet.create({
    blurContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
        paddingVertical: theme.SIZES.radius,
        paddingHorizontal: theme.SIZES.base,
        borderRadius: theme.SIZES.radius
    }
 })

 export default TreadingCard;