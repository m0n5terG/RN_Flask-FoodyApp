import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from '../screens/Profile';
import CamScreen from '../screens/Camera';
import { SIZES } from '../style/theme';
// import { commonStyles, lightStyles, darkStyles } from '../styles/commonStyles';
// import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

function Settings() {

//   const isDark = useSelector((state) => state.accountPref.isDark);
//   const styles = { ...commonStyles, ...isDark ? darkStyles : lightStyles };

  return (
  <Stack.Navigator>
    <Stack.Screen component={Profile} name="Profile" options={{
        title: "Profile",
        // headerStyle: styles.header,
        // headerTitleStyle: styles.headerTitle,
        headerLeft: null
      }} />
      <Stack.Screen component={CamScreen} name="CamScreen" options={{
        title: "Take a photo",
        // headerStyle: styles.header,
        // headerTitleStyle: SIZES.h1,
        // headerTintColor: styles.headerTint
      }}/>
  </Stack.Navigator>
  )
}
export default Settings;