import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
import { emailOrPhoneSchema, isEmail } from '../utility/validation.helper';
import authApi from '../api/auth';
import colors from '../constants/colors';

const validationSchema = Yup.object().shape({
  id: emailOrPhoneSchema,
});

const VerifyPhoneNumberScreen = () => {
  const [otpRequestFailed, setOtpRequestFailed] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSubmit = async ({ id }) => {
    const result = isEmail(id)
      ? await authApi.requestOtp('', id)
      : await authApi.requestOtp(id);
    if (!result.ok || !result.data.success) {
      setOtpRequestFailed(true);
      setErrorMessage(result.data.errorMessage[0]);
      return;
    }
    setOtpRequestFailed(false);
    navigation.navigate(routes.OTP_SCREEN, { id });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomForm
          initialValues={{ id: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View>
            <CustomFormField
              name="id"
              placeholder={t('emailPhonePlaceHolder')}
              errorMessage={t('idErrorMessage')}
            />

            <CustomErrorMessage
              error={errorMessage}
              visible={otpRequestFailed}
            />
            <View style={styles.linkButtonContainer}>
              <CustomLinkButton
                text={t('loginUsingPasswordMessage')}
                onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomSubmitButton label={t('continueText')} />
            </View>
          </View>
        </CustomForm>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
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
