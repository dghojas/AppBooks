import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './HomeStackScreen';
import SearchStackScreen from './SearchStackScreen';
import ProfileStackScreen from './ProfileStackScreen';

import { useTheme } from '../context/Theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {
    mainTheme: { backgroundColor, textColor },
  } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor,
        },
        activeTintColor: textColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
