import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import colors from '../constants/colors';
import { HeaderWhiteBackButton } from './HeaderWhiteBackButton';
import { useTranslation } from 'react-i18next';
import CollectorHomeScreen from '../screens/CollectorHomeScreen1';

const Stack = createStackNavigator();

const CollectorNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.HOME_SCREEN} component={CollectorHomeScreen} />
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

export default CollectorNavigator;
