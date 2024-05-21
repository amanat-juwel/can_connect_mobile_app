import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import routes from './routes';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecycleNavigator from './RecycleNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name={routes.HOME}
      component={RecycleNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.HISTORY_SCREEN}
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={routes.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home-outline"
            color={color}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
