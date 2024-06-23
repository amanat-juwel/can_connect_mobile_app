import React, { useCallback, useEffect, useState } from 'react';
import './src/i18n/i18n.config';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/Navigation/AuthNavigator';
import navigationTheme from './src/Navigation/navigationTheme';
import AppNavigator from './src/Navigation/AppNavigator';
import OfflineNotice from './src/components/OfflineNotice';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return;
    setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        restoreUser();
      } catch (error) {
        console.log(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator user={user} /> : <AuthNavigator />}
        </NavigationContainer>
        <OfflineNotice />
      </AuthContext.Provider>
    </View>
  );
};

export default App;
