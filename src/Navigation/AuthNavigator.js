import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import WelcomeScreen from '../screens/WelcomeScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import OtpScreen from '../screens/OtpScreen';
import VerifyPhoneNumberScreen from '../screens/VerifyPhoneNumberScreen';
import { HeaderBackButton } from './HeaderBackButton';
import HeaderStyle from './HeaderStyle';
import LoginScreen from '../screens/LoginScreen';
import { useTranslation } from 'react-i18next';
import CollectorQuestionnaire from '../screens/CollectorQuestionnaire';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName={routes.WELCOME_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.WELCOME_SCREEN} component={WelcomeScreen} />
      <Stack.Screen
        name={routes.CREATE_ACCOUNT_SCREEN}
        component={CreateAccountScreen}
      />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={routes.COLLECTOR_QUESTIONNAIRE}
        component={CollectorQuestionnaire}
      />
      <Stack.Screen
        name={routes.VERIFY_PHONE_NUMBER_SCREEN}
        component={VerifyPhoneNumberScreen}
        options={() => ({
          headerShown: true,
          title: t('otpVerificationTitle'),
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerLeft: HeaderBackButton,
          headerStyle: HeaderStyle,
        })}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={() => ({
          headerShown: true,
          title: t('otpEntryTitle'),
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerLeft: HeaderBackButton,
          headerStyle: HeaderStyle,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
