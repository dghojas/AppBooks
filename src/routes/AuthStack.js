import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '../context/Theme';

import LoginScreen from '../screen/Login/Login';
import SignupScreen from '../screen/Signup/Signup';

const ScreenStack = createStackNavigator();

const AuthStackScreen = () => {
  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <ScreenStack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerStyle: {
          backgroundColor: backgroundColor,
          shadowColor: 'transparent',
        },
        headerTintColor: textColor,
        headerTitleStyle: {
          fontFamily: 'NotoSerif-bold',
          fontWeight: 'bold',
        },
      }}>
      <ScreenStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <ScreenStack.Screen
        name="Signup"
        component={SignupScreen}
        options={({ navigation }) => ({
          title: 'SignUp',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor={backgroundColor}
              color={textColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </ScreenStack.Navigator>
  );
};

export default AuthStackScreen;
