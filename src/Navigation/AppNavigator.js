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
import { useTranslation } from 'react-i18next';
import { HeaderNotificationIcon } from './HeaderNotificationIcon';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const AppNavigator = ({ user }) => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
        return {
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          headerShown: [
            routes.NOTIFICATION_SCREEN,
            routes.RECYCLE_SCREEN,
            routes.PICKUP_APPOINTMENT_SCREEN,
          ].includes(routeName)
            ? false
            : true,
          tabBarStyle: {
            backgroundColor:
              route.name === routes.PROFILE ? colors.primary : colors.white,
          },
          tabBarActiveTintColor:
            route.name === routes.PROFILE ? colors.white : colors.primary,
          tabBarInactiveTintColor:
            route.name === routes.PROFILE ? colors.white : colors.grey,
        };
      }}
    >
      <Tab.Screen
        name={routes.HOME}
        component={
          user.category === userType.REQUESTOR
            ? RequestorNavigator
            : CollectorNavigator
        }
        options={({}) => ({
          headerTitle: `Hello, ${user.first_name} ${user.last_name}!`,
          headerTitleAlign: 'left',
          headerRight: HeaderNotificationIcon,
          headerRightContainerStyle: { paddingEnd: 15 },
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            height: 125,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
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
              {t('homeText')}
            </Text>
          ),
        })}
      />
      <Tab.Screen
        name={routes.DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{
          unmountOnBlur: true,
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
              {t('dashboardText')}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={routes.HISTORY_SCREEN}
        component={HistoryScreen}
        options={{
          unmountOnBlur: true,
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
              {t('historyText')}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileNavigator}
        options={({ route }) => ({
          headerShadowVisible: false,
          unmountOnBlur: true,
          headerShown: false,
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
              {t('profileText')}
            </Text>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
