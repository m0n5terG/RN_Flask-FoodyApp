import React from 'react';
import { 
    Image,
    Text,
    TouchableOpacity,
    View
 } from 'react-native';
 import { API_IMAGE_URL } from "../constants/API";


import * as theme from '../style/theme';

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginTop: 10,
                borderRadius: theme.SIZES.radius,
                backgroundColor: theme.COLORS.gray2,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image 
                source={{ uri: API_IMAGE_URL + categoryItem.image}}
                resizeMode="cover"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10
                }}
            />
            <View
                style={{
                    width: '65%',
                    paddingHorizontal: 20
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...theme.FONTS.h2
                    }}
                >
                    {categoryItem.title}
                </Text>
                <Text
                    style={{
                        color: theme.COLORS.gray,
                        ...theme.FONTS.body4
                    }}
                >
                    {categoryItem.duration} | {categoryItem.serving} Serving
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard;