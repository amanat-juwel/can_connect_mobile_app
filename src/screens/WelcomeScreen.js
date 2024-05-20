import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import ClickableTextButton from '../components/ClickableTextButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const WelcomeScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation(); // Access navigation object

  const imageWidth = width * 0.38 * 0.7;
  const imageHeight = imageWidth * (138 / 184);

  const handleCreateAccountPress = () => {
    navigation.navigate('CreatAccountScreen'); // Navigate to 'CreatAccountScreen'
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image in top right corner */}
      <Image
        source={require('../../assets/images/splashTopRight.png')}
        style={[styles.topRightImage, { opacity: 1.0 }]}
      />

      {/* Image in top left corner */}
      <ImageBackground
        source={require('../../assets/images/splashTopLeft.png')}
        style={[styles.topLeftImage, { opacity: 1.0 }]}
      />

      {/* White gradient from bottom to top */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
      />
      <View style={styles.iconContainer}>
        <View
          style={[
            styles.banner,
            { height: height / 2.1, width: width, alignItems: 'center' },
          ]}
        >
          <Image
            source={require('../../assets/images/bannerImg.png')}
            style={[styles.banner, { width: width * 0.9 }]}
            resizeMode="contain"
          />
        </View>
        <Image
          source={require('../../assets/images/icon.png')}
          style={[{ width: imageWidth, height: imageHeight }]}
        />
        {/* Welcome Text and Message */}
        <Text style={styles.welcomeText}>Welcome to Can Connect</Text>


        <Text style={styles.welcomeMsg}>Connecting People To Recycle</Text>
      </View>

      <View style={styles.bottomView}>
      <CustomButton
        label="Create account"
        onPress={handleCreateAccountPress}
      />

        <View style={styles.bottomPosition}>
          <ClickableTextButton 
            text="Log In" 
            navigationPage="LoginScreen" 
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    zIndex: 1,
    marginTop: 0,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'normal',
  },
  welcomeMsg: {
    fontSize: 20,
    color: 'rgba(0, 167, 90, 1)',
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 1.25, // Adjust height if needed
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  banner: {
    height: Dimensions.get('window').height / 1.75,
  },
  bottomView: {
    position: 'absolute',
    bottom: 20, // Adjust as needed
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomPosition: {
    alignItems: 'center'
  }
});

export default WelcomeScreen;
