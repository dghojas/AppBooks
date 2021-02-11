import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors';
import { useTheme } from '../context/Theme';
import { AuthContext } from '../routes/AuthProvider';

const styles = StyleSheet.create({
  viewMenu: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  viewProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  viewUser: {
    marginLeft: 15,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#33363a',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textTheme: {
    color: '#33363a',
  },
  textPreferences: {
    color: 'blue',
  },
});

export function DrawerContent(props) {
  const { mainTheme, darkModeEnabled, toggleDarkMode } = useTheme();
  const { backgroundColor, textColor } = mainTheme;
  const { navigation } = props;
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('profile')
      .doc(user.uid)
      .get()
      .then((queryProfile) => {
        if (queryProfile.exists) {
          setUserData(queryProfile.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  });

  return (
    <View style={[styles.viewMenu, { backgroundColor: backgroundColor }]}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.viewProfile}>
              <Avatar.Image
                size={50}
                source={{
                  uri: userData
                    ? userData.userImg
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7owOngoFuxJJETV6urjbSBDR-li34xtrjkw&usqp=CAU',
                }}
              />
              <View style={styles.viewUser}>
                <Title
                  style={[
                    styles.title,
                    {
                      color: textColor,
                    },
                  ]}>
                  {userData ? userData.userName : 'Test'}
                </Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ios-home-outline" color={textColor} size={size} />
              )}
              label="Home"
              inactiveTintColor={textColor}
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="person-outline" color={textColor} size={size} />
              )}
              label="Profile"
              inactiveTintColor={textColor}
              onPress={() => {
                navigation.navigate('ProfileScree');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple>
              <View style={styles.preference}>
                <Text style={[styles.textTheme, { color: textColor }]}>
                  Dark Theme
                </Text>
                <View>
                  <Switch
                    trackColor={{ false: colors.white, true: colors.gray }}
                    thumbColor={darkModeEnabled ? colors.black : colors.white}
                    ios_backgroundColor={colors.white}
                    onValueChange={toggleDarkMode}
                    value={darkModeEnabled}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-outline" color={textColor} size={size} />
          )}
          label="Sign Out"
          inactiveTintColor={textColor}
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
}
