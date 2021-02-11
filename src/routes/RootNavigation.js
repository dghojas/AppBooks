import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

import AuthStackScreen from './AuthStack'; // Auth Login or SignUp Stack
import DrawerNavigator from './DrawerNavigator'; // Home Stack

const RootNavigation = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (userProps) => {
    setUser(userProps);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default RootNavigation;
