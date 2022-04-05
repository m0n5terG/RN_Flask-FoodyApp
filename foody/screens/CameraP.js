// import React, { useEffect, useState, useRef } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Camera } from 'expo-camera';
// import { FontAwesome } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { uploadPicAction } from '../redux/ducks/accountPref';

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
// import { darkStyles, lightStyles, commonStyles } from '../styles/commonStyles';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfileImageAction } from '../redux/ducks/accountPref';

function CamScreen ({ navigation }) {

//   const isDark = useSelector((state) => state.accountPref.isDark);
//   const styles = isDark ? darkStyles : lightStyles
  const dispatch = useDispatch();

  const [hasPermission, setHasPermission] = useState(null);
  
  const [back, setBack] = useState(true)
  const cameraRef = useRef(null)

  async function showCamera() {
    const types = await Camera.requestCameraPermissionsAsync();
    setHasPermission(types === 'granted');
  
    if (hasPermission === null) {
      Alert.alert("Error: No access given")
    }
  }

  function flip() {
    setBack(!back)
  }

  async function takePicture() {
    const photo = await cameraRef.current.takePictureAsync()
    // console.log(photo)
    console.log(photo)
    dispatch({ ...dispatch(uploadProfileImageAction()), payload: photo})
    navigation.navigate("Account")
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={flip}>
          <FontAwesome name="refresh" size={24} style={{ marginRight: 15 }} />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    showCamera()
  }, [])

  return (
    <View style={{ 
        flex: 1,
        backgroundColor: "white"
    }}>
      <Camera style={additionalStyles.camera}
        type={back ? Camera.Constants.Type.back : Camera.Constants.Type.front} ref={cameraRef}>
        <View style={additionalStyles.innerView}>
          <View style={additionalStyles.buttonView}>
            <TouchableOpacity onPress={takePicture}
              style={[additionalStyles.circleButton]}>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  )
}

  const additionalStyles = StyleSheet.create({
    camera: {
      flex: 1,
    },
      circle: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    circleButton: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
    },
    buttonView: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center'
    },
    innerView: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'space-between'
    }
  })

  export default CamScreen;


// export default function CameraScreen({ navigation }) {

//     const dispatch = useDispatch();

//     const [hasPermission, setHasPermission] = useState(null);
//     const [type, setType] = useState(Camera.Constants.Type.back);

//     const [back, setBack] = useState(true)
//     const cameraRef = useRef(null)

//     async function showCam() {
//         const types = await Camera.getAvailableCameraTypesAsync();
//           setHasPermission(status === 'granted');

//     if (hasPermission === null) {
//         return <View />;
//     }
//     if (hasPermission === false) {
//         return <Text>No access to camera</Text>;
//     }

//     function flip() {
//         setBack(!back)
//     }

//     async function takePicture() {
//         const photo = await cameraRef.current.takePictureAsync()
//         // console.log(photo)
//         console.log(photo)
//         dispatch({ ...dispatch(uploadPicAction()), payload: photo})
//         navigation.navigate("Account")
//     }

//     useEffect(() => {
//         navigation.setOptions({
//           headerRight: () => (
//             <TouchableOpacity onPress={flip}>
//               <FontAwesome name="refresh" size={24} style={{ marginRight: 15 }} />
//             </TouchableOpacity>
//           ),
//         });
//       });
    
//       useEffect(() => {
//         showCamera()
//       }, [])

      
//     return (
//         <View style={styles.container}>
//           <Camera style={styles.camera} type={type}>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={takePicture}
//                 //     () => {
//                 //   setType(
//                 //     type === Camera.Constants.Type.back
//                 //       ? Camera.Constants.Type.front
//                 //       : Camera.Constants.Type.back
//                 //   );
//                 // }}
//                 >
//                 <Text style={styles.text}> Flip </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }}

//     const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//         },
//         camera: {
//           flex: 1,
//         },
//         buttonContainer: {
//           flex: 1,
//           backgroundColor: 'transparent',
//           flexDirection: 'row',
//           margin: 20,
//         },
//         button: {
//           flex: 0.1,
//           alignSelf: 'flex-end',
//           alignItems: 'center',
//         },
//         text: {
//           fontSize: 18,
//           color: 'white',
//         },
//       });
      
//   async function takePicture() {
//     const photo = await cameraRef.current.takePictureAsync()
//     // console.log(photo)
//     console.log(photo)
//     dispatch({ ...dispatch(uploadPicAction()), payload: photo})
//     navigation.navigate("Account")
//   }

//     useEffect(() => {
//         navigation.setOptions({
//         headerRight: () => (
//             <TouchableOpacity onPress={flip}>
//             <FontAwesome name="refresh" size={24} style={{ color: styles.headerTint, marginRight: 15 }} />
//             </TouchableOpacity>
//         ),
//         });
//     });

//     useEffect(() => {
//         showCamera()
//     }, [])

//     return (
//         <View>
//             <Camera
//                 type={back ? Camera.Constants.Type.back : Camera.Constants.Type.front} ref={cameraRef}>
//                     <View>
//                         <View >
//                             <TouchableOpacity 
//                                 onPress={takePicture}
//                             >
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//             </Camera>
//         </View>
//     )
//     }

//   const additionalStyles = StyleSheet.create({
//     camera: {
//       flex: 1,
//     },
//       circle: {
//       height: 50,
//       width: 50,
//       borderRadius: 50,
//     },
//     circleButton: {
//       width: 70,
//       height: 70,
//       bottom: 0,
//       borderRadius: 50,
//     },
//     buttonView: {
//       alignSelf: 'center',
//       flex: 1,
//       alignItems: 'center'
//     },
//     innerView: {
//       position: 'absolute',
//       bottom: 0,
//       flexDirection: 'row',
//       padding: 20,
//       justifyContent: 'space-between'
//     }
//   }