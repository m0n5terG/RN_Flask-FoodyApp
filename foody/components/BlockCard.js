import React from 'react';
import { 
    View,
    Image,
    Text,
    TouchableWithoutFeedback
 } from 'react-native';

 const BlockCard = () => {

    const { thumbnail, title, desc } = item;
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={{

                }}
            >
                <Image 
                    style={{

                    }}/>
                <View
                    style={{

                    }}
                >
                    <Text
                        style={{

                        }}
                    >

                    </Text>
                    <Text
                        style={{
                            
                        }}
                    >

                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
 };

 export default BlockCard;