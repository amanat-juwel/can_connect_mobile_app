import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import CustomLinkButton from '../components/CustomLinkButton';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import { CustomErrorMessage } from '../components/forms';

const OtpScreen = ({ route }) => {
  const [loginFailed, setLoginFailed] = useState();
  const { login } = useAuth();
  const [otpCode1, setOtpCode1] = useState('');
  const [otpCode2, setOtpCode2] = useState('');
  const [otpCode3, setOtpCode3] = useState('');
  const [otpCode4, setOtpCode4] = useState('');
  const [otpCode5, setOtpCode5] = useState('');
  const [otpCode6, setOtpCode6] = useState('');

  const otpInput1 = useRef(null);
  const otpInput2 = useRef(null);
  const otpInput3 = useRef(null);
  const otpInput4 = useRef(null);
  const otpInput5 = useRef(null);
  const otpInput6 = useRef(null);

  const handleSubmit = async () => {
    const otpCode = `${otpCode1}${otpCode2}${otpCode3}${otpCode4}${otpCode5}${otpCode6}`;
    if (otpCode.length < 6) return;

    const result = await authApi.loginByOtp(route.params.id, otpCode);
    if (!result.ok || !result.data.success) return setLoginFailed(true);
    setLoginFailed(false);
    login(result.data);
  };

  const resendCode = () => {
    authApi.requestOtp(route.params.id);
  };

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={otpInput1}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode1}
          onChangeText={(text) => {
            setOtpCode1(text);
            if (text) otpInput2.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput2}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode2}
          onChangeText={(text) => {
            setOtpCode2(text);
            if (text) otpInput3.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput3}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode3}
          onChangeText={(text) => {
            setOtpCode3(text);
            if (text) otpInput4.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput4}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode4}
          onChangeText={(text) => {
            setOtpCode4(text);
            if (text) otpInput5.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput5}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode5}
          onChangeText={(text) => {
            setOtpCode5(text);
            if (text) otpInput6.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput6}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode6}
          onChangeText={setOtpCode6}
          maxLength={1}
        />
      </View>
      <CustomErrorMessage
        error={t('loginFailedMessage')}
        visible={loginFailed}
      />
      <View style={styles.buttonContainer}>
        <CustomButton label={t('submitText')} onPress={handleSubmit} />
      </View>
      <View style={styles.linkButtonContainer}>
        <CustomLinkButton text={t('resendOtpText')} onPress={resendCode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    width: '15%',
    height: 60,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  linkButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
});

export default OtpScreen;
