import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RecycleScreen from '../screens/RecycleScreen';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RequestorHomeScreen from '../screens/RequestorHomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { HeaderWhiteBackButton } from './HeaderWhiteBackButton';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const RequestorNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.HOME_SCREEN} component={RequestorHomeScreen} />
      <Stack.Screen name={routes.RECYCLE_SCREEN} component={RecycleScreen} />
      <Stack.Screen
        name={routes.DASHBOARD_SCREEN}
        component={DashboardScreen}
      />
      <Stack.Screen
        name={routes.PICKUP_APPOINTMENT_SCREEN}
        component={PickupAppointmentScreen}
      />
      <Stack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: t('notificationText'),
          headerTitleAlign: 'center',
          headerTitleStyle: { color: colors.white },
          headerLeft: HeaderWhiteBackButton,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default RequestorNavigator;
