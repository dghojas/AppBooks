import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            Alert.alert('Login', 'Wrong password!');
          }
        },
        register: async (name, email, password, phone) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then((userAuth) => {
                const uid = userAuth.user._user.uid;

                firestore()
                  .collection('profile')
                  .doc(auth().currentUser.uid)
                  .set({
                    userId: uid,
                    userImg: null,
                    userName: name,
                    userEmail: email,
                    userPhone: phone,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                  })
                  .catch((error) => {
                    console.log(
                      'Something went wrong with added profile to firestore.',
                    );
                  });
              })
              .catch((error) => {
                console.log('Error => ', error.message);
              });
          } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
              Alert.alert(
                'Email address',
                'That email address is already in use!',
              );
            }
            if (e.code === 'auth/invalid-email') {
              Alert.alert('Email address', 'That email address is invalid!');
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
