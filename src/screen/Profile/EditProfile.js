import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import { useTheme } from '../../context/Theme';
import { AuthContext } from '../../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

const EditProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);

  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  const getUser = async () => {
    await firestore()
      .collection('profile')
      .doc(user.uid)
      .get()
      .then((queryProfile) => {
        console.log(queryProfile.exists);
        if (queryProfile.exists) {
          setUserData(queryProfile.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();
    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('profile')
      .doc(user.uid)
      .update({
        userImg: imgUrl,
        userName: userData.userName,
        userEmail: userData.userEmail,
        userPhone: userData.userPhone,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={styles.textAlignCenter}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = useRef(null);
  const fall = new Animated.Value(1);
  useEffect(() => {
    bs.current;
  }, [bs]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, -5]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={[
          styles.animatedView,
          { opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) },
        ]}>
        <View style={styles.textAlignCenter}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View style={styles.imgBg}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                      ? userData.userImg ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7owOngoFuxJJETV6urjbSBDR-li34xtrjkw&usqp=CAU'
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7owOngoFuxJJETV6urjbSBDR-li34xtrjkw&usqp=CAU',
                }}
                style={styles.imgMedida}
                imageStyle={styles.imageRadius}>
                <View style={styles.boxCamera}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={styles.iconCamera}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={[styles.textUserName, { color: textColor }]}>
            {userData ? userData.userName : ''}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={textColor} size={20} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={textColor}
            autoCorrect={false}
            value={userData ? userData.userName : ''}
            onChangeText={(txt) => setUserData({ ...userData, userName: txt })}
            style={[
              styles.textInput,
              {
                color: textColor,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={textColor} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={textColor}
            keyboardType="number-pad"
            autoCorrect={false}
            value={userData ? userData.userPhone : ''}
            onChangeText={(txt) => setUserData({ ...userData, userPhone: txt })}
            style={[
              styles.textInput,
              {
                color: textColor,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={textColor} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            value={userData ? userData.userEmail : ''}
            onChangeText={(txt) => setUserData({ ...userData, userEmail: txt })}
            style={[
              styles.textInput,
              {
                color: textColor,
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={[styles.commandButton, { color: textColor }]}
          onPress={handleUpdate}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#5c5e61',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#5c5e61',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textUserName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  textAlignCenter: {
    alignItems: 'center',
  },
  animatedView: {
    margin: 20,
  },
  imgBg: {
    height: 100,
    width: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMedida: {
    height: 100,
    width: 100,
  },
  iconCamera: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  imageRadius: {
    borderRadius: 15,
  },
});
