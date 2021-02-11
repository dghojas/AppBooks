import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/Theme';

import ProfileScreen from '../screen/Profile/Profile';
import EditProfileScreen from '../screen/Profile/EditProfile';

const ScreenStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  return (
    <ScreenStack.Navigator
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
        name="ProfileScree"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={backgroundColor}
              color={textColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <ScreenStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
        }}
      />
    </ScreenStack.Navigator>
  );
};

export default ProfileStackScreen;
