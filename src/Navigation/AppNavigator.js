import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import routes from './routes';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native';
import colors from '../constants/colors';
import DashboardScreen from '../screens/DashboardScreen';
import RequestorNavigator from './RequestorNavigator';
import CollectorNavigator from './CollectorNavigator';
import userType from '../constants/userType';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();
const AppNavigator = ({ user }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: 'center',
      tabBarStyle: {
        backgroundColor:
          route.name === routes.PROFILE ? colors.primary : colors.white,
      },
      tabBarActiveTintColor:
        route.name === routes.PROFILE ? colors.white : colors.primary,
      tabBarInactiveTintColor:
        route.name === routes.PROFILE ? colors.white : colors.grey,
    })}
  >
    <Tab.Screen
      name={routes.HOME}
      component={
        user.category === userType.REQUESTOR
          ? RequestorNavigator
          : CollectorNavigator
      }
      options={{
        headerTitle: `Hello, ${user.first_name} ${user.last_name}!`,
        headerTitleAlign: 'left',
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
      name={routes.DASHBOARD_SCREEN}
      component={DashboardScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="view-dashboard-outline"
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
            Dashboard
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
      name={routes.PROFILE}
      component={ProfileNavigator}
      options={{
        headerTitle: '',
        headerShadowVisible: false,
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
