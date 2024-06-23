import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RecycleScreen from '../screens/RecycleScreen';
import HomeScreen from '../screens/HomeScreen';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const RecycleNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen name={routes.RECYCLE_SCREEN} component={RecycleScreen} />
    <Stack.Screen name={routes.DASHBOARD_SCREEN} component={DashboardScreen} />
    <Stack.Screen
      name={routes.PICKUP_APPOINTMENT_SCREEN}
      component={PickupAppointmentScreen}
    />
  </Stack.Navigator>
);

export default RecycleNavigator;
