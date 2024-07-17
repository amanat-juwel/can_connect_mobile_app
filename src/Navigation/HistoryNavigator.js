import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RecycleScreen from '../screens/RecycleScreen';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { HeaderWhiteBackButton } from './HeaderWhiteBackButton';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';
import RequestorHomeScreen from '../screens/RequestorHomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HistoryDetailsScreen from '../screens/HistoryDetailsScreen';

const Stack = createStackNavigator();

const HistoryNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName={routes.HISTORY_SCREEN}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name={routes.HISTORY_SCREEN}
        component={HistoryScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: t('historyText'),
          headerTitleAlign: 'center',
          headerTitleStyle: { color: colors.white },
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
      <Stack.Screen
        name={routes.HISTORY_DETAILS_SCREEN}
        component={HistoryDetailsScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: t('requestDetailsText'),
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

export default HistoryNavigator;
