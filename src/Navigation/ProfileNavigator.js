import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />
    <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfileScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
