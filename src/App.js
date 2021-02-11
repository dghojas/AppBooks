/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './routes/AuthProvider';
import RootNavigation from './routes/RootNavigation';

import Theme from './context/Theme';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Theme>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </Theme>
    </>
  );
};

export default App;
