import React from 'react';
import './src/i18n/i18n.config';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import navigationTheme from './src/Navigation/navigationTheme';
import AppNavigator from './src/Navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
