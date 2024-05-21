import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomInputTextField from '../components/CustomInputTextField';
import CustomButton from '../components/CustomButton';
import CustomInputPasswordField from '../components/CustomInputPasswordField';
import CustomCheckBox from '../components/CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { width } = Dimensions.get('window');
  const imageWidth = width * 0.38 * 0.8;
  const imageHeight = imageWidth * (138 / 184);
  const navigation = useNavigation();

  const handleLogIn = () => {
    // Implement signin logic here

    // If Successful Log In
    navigation.navigate('VerifyPhoneNumberScreen');
  };

  const handlePress = () => {
    // Open the link in the browser
    Linking.openURL('https://www.google.com/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={{ width: imageWidth, height: imageHeight }}
        />
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>{t('loginText')}</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomInputTextField
            placeholder={t('emailPhonePlaceHolder')}
            style={styles.input}
          />
          <CustomInputPasswordField
            placeholder={t('PasswordPlaceHolder')}
            style={styles.input}
          />
        </View>

        <View style={styles.rememberContainer}>
          <CustomCheckBox
            title={t('rememberMeText')}
            checked={false}
            onPress={() => {}}
          />
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.forgetPassword, { color: 'blue' }]}>
              {t('forgetPasswordText')}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          label={t('loginText')}
          onPress={handleLogIn}
          style={styles.button}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.createAccountContainer}>
          {t('doNotHaveAccountText')}{' '}
          <Text
            style={styles.createAccountText}
            onPress={() => navigation.navigate('CreatAccountScreen')}
          >
            {t('createAccountText')}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    marginTop: 60,
    alignItems: 'center', // Center the image horizontally
  },
  textContainer: {
    alignSelf: 'flex-start', // Align the text to the left
    marginBottom: 20,
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  termsContainer: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: 'row',
  },
  terms: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  createAccountContainer: {
    fontSize: 16,
  },
  createAccountText: {
    fontWeight: 'bold',
    color: '#00A75A',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
  },
  button: {
    width: '100%',
  },
});

export default LoginScreen;
