import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from '../components/CustomLinkButton';
import routes from '../Navigation/routes';
import {
  CustomForm,
  CustomFormField,
  CustomSubmitButton,
  CustomErrorMessage,
} from '../components/forms';
import * as Yup from 'yup';
import { emailOrPhoneSchema } from '../utility/validation.helper';
import authApi from '../api/auth';

const validationSchema = Yup.object().shape({
  id: emailOrPhoneSchema,
});

const VerifyPhoneNumberScreen = () => {
  const [otpRequestFailed, setOtpRequestFailed] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSubmit = async ({ id }) => {
    const result = await authApi.requestOtp(id);
    if (!result.ok || !result.data.success) {
      setOtpRequestFailed(true);
      setErrorMessage(result.data.errorMessage[0]);
      return;
    }
    setOtpRequestFailed(false);
    navigation.navigate(routes.OTP_SCREEN, { id });
  };

  return (
    <View style={styles.container}>
      <CustomForm
        initialValues={{ id: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <CustomFormField name="id" placeholder={t('emailPhonePlaceHolder')} />

        <CustomErrorMessage error={errorMessage} visible={otpRequestFailed} />
        <View style={styles.linkButtonContainer}>
          <CustomLinkButton
            text={t('loginUsingPasswordMessage')}
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomSubmitButton label={t('continueText')} />
        </View>
      </CustomForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  linkButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 50,
  },
});

export default VerifyPhoneNumberScreen;
