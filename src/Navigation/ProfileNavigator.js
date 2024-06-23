import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { useTranslation } from 'react-i18next';
import HeaderStyle from './HeaderStyle';
import colors from '../constants/colors';
import { HeaderWhiteBackButton } from './HeaderWhiteBackButton';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName={routes.PROFILE_SCREEN}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          },
        })}
      />
      <Stack.Screen
        name={routes.EDIT_PROFILE}
        component={EditProfileScreen}
        options={() => ({
          headerShown: true,
          headerTitle: t('editAccountText'),
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
      <Stack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={NotificationScreen}
        options={() => ({
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

export default ProfileNavigator;
