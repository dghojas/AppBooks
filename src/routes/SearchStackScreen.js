import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/Theme';

import SearchScreen from '../screen/Search/Search';
import DetailsScreen from '../screen/Details/Details';

const ScreenStack = createStackNavigator();

const SearchStackScreen = ({ navigation }) => {
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
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
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
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Detail Book',
        }}
      />
    </ScreenStack.Navigator>
  );
};

export default SearchStackScreen;
