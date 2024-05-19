import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import CreatAccountScreen from './src/screens/CreatAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import VerifyPhoneNumberScreen from './src/screens/VerifyPhoneNumberScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScree" component={WelcomeScreen} />
        <Stack.Screen name="CreatAccountScreen" component={CreatAccountScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen 
          name="VerifyPhoneNumberScreen" 
          component={VerifyPhoneNumberScreen}
          options={({ navigation }) => ({ 
            headerShown: true,
            title: 'Verify Phone Number',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="chevron-left" size={30} style={{ marginLeft: 15 }} />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
      {/* <SplashScreen/> */}
    </NavigationContainer>
  );
};

export default App;

