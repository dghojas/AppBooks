import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../context/Theme';
import { AuthContext } from '../../routes/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userPhone: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 22,
    color: '#666',
    textAlign: 'center',
  },
});

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView
      style={[styles.safeAreaView, { backgroundColor: backgroundColor }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: backgroundColor }]}
        contentContainerStyle={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7owOngoFuxJJETV6urjbSBDR-li34xtrjkw&usqp=CAU',
          }}
        />
        <Text style={[styles.userName, { color: textColor }]}>
          {userData ? userData.userName : 'Test'}
        </Text>
        <Text style={[styles.userEmail, { color: textColor }]}>
          {userData ? userData.userEmail : 'Test'}
        </Text>
        <Text style={[styles.userPhone, { color: textColor }]}>
          {userData ? userData.userPhone : 'Test'}
        </Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={[styles.userBtn, { borderColor: textColor }]}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[styles.userBtnTxt, { color: textColor }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userBtn, { borderColor: textColor }]}
            onPress={() => logout()}>
            <Text style={[styles.userBtnTxt, { color: textColor }]}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
