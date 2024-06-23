import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RecycleScreen from '../screens/RecycleScreen';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RequestorHomeScreen from '../screens/RequestorHomeScreen';

const Stack = createStackNavigator();

const RequestorNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME_SCREEN} component={RequestorHomeScreen} />
    <Stack.Screen name={routes.RECYCLE_SCREEN} component={RecycleScreen} />
    <Stack.Screen name={routes.DASHBOARD_SCREEN} component={DashboardScreen} />
    <Stack.Screen
      name={routes.PICKUP_APPOINTMENT_SCREEN}
      component={PickupAppointmentScreen}
    />
  </Stack.Navigator>
);

export default RequestorNavigator;
