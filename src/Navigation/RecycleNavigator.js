import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import RecycleScreen from '../screens/RecycleScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import HomeScreen from '../screens/HomeScreen';
import PickupAppointmentScreen from '../screens/PickupAppointmentScreen';

const Stack = createStackNavigator();

const RecycleNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen name={routes.RECYCLE_SCREEN} component={RecycleScreen} />
    <Stack.Screen name={routes.SCHEDULE_SCREEN} component={ScheduleScreen} />
    <Stack.Screen name={routes.PICKUP_APPOINTMENT_SCREEN} component={PickupAppointmentScreen}/>
  </Stack.Navigator>
);

export default RecycleNavigator;
