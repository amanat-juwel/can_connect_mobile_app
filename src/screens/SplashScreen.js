import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScree'); // Navigate to WelcomeScreen after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Splash Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default SplashScreen;
