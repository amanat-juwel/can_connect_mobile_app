import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const SplashScreen = () => {
  // Navigtion.
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScree');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Icon Size fixing.
  const { width, height } = Dimensions.get('window');

  const imageWidth = width * 0.38;
  const imageHeight = imageWidth * (138 / 184);

  return (
    <View style={styles.container}>
      {/* Icon */}

      <Image
        source={require('../../assets/icon.png')}
        style={[styles.image, { width: imageWidth, height: imageHeight }]}
      />

      {/* Image in top right corner */}
      <Image
        source={require('../../assets/splashTopRight.png')}
        style={[styles.topRightImage, { opacity: 1.0 }]}
      />

      {/* Image in top left corner */}
      <Image
        source={require('../../assets/splashTopLeft.png')}
        style={[styles.topLeftImage, { opacity: 1.0 }]}
      />

      {/* White gradient from bottom to top */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    position: 'absolute',
    zIndex: 1,
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  topLeftImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').width * 1.25,
    width: Dimensions.get('window').width,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

export default SplashScreen;
