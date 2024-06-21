import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import routes from '../Navigation/routes';
import {
  CustomForm,
  CustomFormField,
  CustomSubmitButton,
  CustomErrorMessage,
} from '../components/forms';
import * as Yup from 'yup';
import authApi from '../api/auth';
import colors from '../constants/colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPasswordScreen = () => {
  const [forgotPasswordRequestFailed, setForgotPasswordRequestFailed] =
    useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isRestSuccessful, setIsRestSuccessful] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSubmit = async ({ email }) => {
    if (isRestSuccessful) {
      return navigation.navigate(routes.WELCOME_SCREEN);
    }
    const result = await authApi.requestForgotPassword(email);
    if (!result.ok || !result.data.success) {
      setForgotPasswordRequestFailed(true);
      setErrorMessage(result.data.errorMessage[0]);
      return;
    }
    setForgotPasswordRequestFailed(false);
    setIsRestSuccessful(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomForm
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View>
            <CustomFormField
              name="email"
              placeholder={t('emailText')}
              errorMessage={t('emailErrorMessage')}
            />
            {isRestSuccessful && (
              <View style={styles.successMessageContainer}>
                <Text style={styles.successMessage}>
                  {t('passwordResetSuccessMessage')}
                </Text>
              </View>
            )}

            <CustomErrorMessage
              error={errorMessage}
              visible={forgotPasswordRequestFailed}
            />
            <View style={styles.buttonContainer}>
              <CustomSubmitButton
                label={isRestSuccessful ? t('continueText') : t('resetText')}
              />
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
  successMessageContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  successMessage: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
