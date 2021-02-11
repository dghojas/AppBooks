import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './DrawerContent';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screen/Profile/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
