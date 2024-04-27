import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = () => {
  const { width, height } = Dimensions.get('window');

  const imageWidth = width * 0.38 * 0.7;
  const imageHeight = imageWidth * (138 / 184);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Icon */}

      <View style={styles.iconContainer}>
        <Image
          source={require('../../assets/bannerImg.png')}
          style={[styles.banner, { width: width * 0.9 }]}
          resizeMode="contain"
        />

        <Image
          source={require('../../assets/icon.png')}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />
        <Text style={styles.welcomeText}>Welcome to Can Connect</Text>
        <Text style={styles.welcomeMsg}>Connecting People To Recycle</Text>
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'row'
  },
  iconContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'normal',
    zIndex: 1,
  },
  welcomeMsg: {
    fontSize: 20,
    color: 'rgba(0, 167, 90, 1)',
    zIndex: 1,
  },

  image: {
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
  banner: {
    zIndex: 1,
    top: 0,
  },
});

export default WelcomeScreen;
