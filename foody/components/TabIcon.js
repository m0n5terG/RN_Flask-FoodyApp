import React from 'react';
import { 
    View,
    Image
 } from 'react-native';

 import * as theme from '../style/theme';

 const TabIcon = ({ focused, icon }) => {
     return (
         <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
                width: 50
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? theme.COLORS.darkGreen : theme.COLORS.lightLime
                }}
            />

            {focused &&
                <View
                    style={{
                        position: 'absolute',
                        left:  0,
                        right: 0,
                        bottom: 0,
                        height: 5,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        backgroundColor: theme.COLORS.darkGreen
                    }}
                />
            }
        </View>
     )
 }

 export default TabIcon