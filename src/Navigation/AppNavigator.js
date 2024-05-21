import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import routes from './routes';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecycleNavigator from './RecycleNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor:
          route.name === routes.PROFILE_SCREEN ? colors.primary : colors.white,
      },
      tabBarActiveTintColor:
        route.name === routes.PROFILE_SCREEN ? colors.white : colors.primary,
      tabBarInactiveTintColor:
        route.name === routes.PROFILE_SCREEN ? colors.white : colors.grey,
    })}
  >
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
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 16,
              color,
              fontWeight: focused ? 'bold' : 'normal',
            }}
          >
            Home
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name={routes.HISTORY_SCREEN}
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="refresh" color={color} size={size} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 16,
              color,
              fontWeight: focused ? 'bold' : 'normal',
            }}
          >
            History
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name={routes.SCHEDULE_SCREEN}
      component={HistoryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-check-outline"
            color={color}
            size={size}
          />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 16,
              color,
              fontWeight: focused ? 'bold' : 'normal',
            }}
          >
            Schedule
          </Text>
        ),
      }}
    />
    <Tab.Screen
      name={routes.PROFILE_SCREEN}
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            color={color}
            size={size}
          />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text
            style={{
              fontSize: 16,
              color,
              fontWeight: focused ? 'bold' : 'normal',
            }}
          >
            Profile
          </Text>
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
