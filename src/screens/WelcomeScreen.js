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
import { useNavigation } from '@react-navigation/native';
import routes from '../Navigation/routes';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from '../components/CustomLinkButton';
import colors from '../constants/colors';

const WelcomeScreen = () => {
  const { t } = useTranslation();
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();

  const imageWidth = width * 0.38 * 0.7;
  const imageHeight = imageWidth * (138 / 184);

  const handleCreateAccountPress = () => {
    navigation.navigate(routes.CREATE_ACCOUNT_SCREEN);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/images/splashTopRight.png')}
        style={[styles.topRightImage, { opacity: 1.0 }]}
      />

      <ImageBackground
        source={require('../../assets/images/splashTopLeft.png')}
        style={[styles.topLeftImage, { opacity: 1.0 }]}
      />

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

        <Text style={styles.welcomeText}>{t('welcomeMessage')}</Text>

        <Text style={styles.welcomeMsg}>{t('tagline')}</Text>
      </View>

      <View style={styles.bottomView}>
        <CustomButton
          label={t('createAccountButtonText')}
          onPress={handleCreateAccountPress}
        />

        <View style={styles.bottomPosition}>
          <CustomLinkButton
            text={t('loginText')}
            onPress={() =>
              navigation.navigate(routes.VERIFY_PHONE_NUMBER_SCREEN)
            }
            LinkColor={colors.primary}
            fontSize={18}
            fontWeight="bold"
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
    height: Dimensions.get('window').width * 1.25,
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
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomPosition: {
    alignItems: 'center',
  },
});

export default WelcomeScreen;
