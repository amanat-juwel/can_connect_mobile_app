import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomInputTextField from '../components/CustomInputTextField';
import CustomButton from '../components/CustomButton';
import CustomInputPasswordField from '../components/CustomInputPasswordField';
import CustomCheckBox from '../components/CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import CanConnectLogo from '../components/CanConnectLogo';
import colors from '../constants/colors';
import CustomLabel from '../components/CustomLabel';
import CustomLinkButton from '../components/CustomLinkButton';
import CustomFooter from '../components/CustomFooter';
import routes from '../Navigation/routes';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { emailOrPhoneSchema } from '../utility/validation.helper';
import ErrorMessage from '../components/ErrorMessage';
import CustomFormField from '../components/CustomFormField';
import CustomSubmitButton from '../components/CustomSubmitButton';
import CustomForm from '../components/CustomForm';

const validationSchema = Yup.object().shape({
  id: emailOrPhoneSchema,
  password: Yup.string().required(),
});

const LoginScreen = () => {
  const [loginFailed, setLoginFailed] = useState();
  const [isRememberMeChecked, setRememberMeChecked] = useState(true);

  const { t } = useTranslation();
  const { login } = useAuth();

  const navigation = useNavigation();

  const handleLogIn = async () => {
    // navigation.navigate('VerifyPhoneNumberScreen');
    const result = await authApi.login('01675711885', '123456');
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    console.log(result.data.data);
    login(result.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CanConnectLogo />
      </View>

      <View style={styles.loginContainer}>
        <CustomLabel text={t('loginText')} />
        <View style={styles.formContainer}>
          <CustomForm
            initialValues={{ id: '', password: '' }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <CustomFormField
              name="id"
              placeholder={t('emailPhonePlaceHolder')}
            />

            <CustomFormField
              name="password"
              isPasswordField
              placeholder={t('PasswordPlaceHolder')}
            />

            <View style={styles.rememberContainer}>
              <CustomCheckBox
                title={t('rememberMeText')}
                isChecked={isRememberMeChecked}
                onPress={setRememberMeChecked}
              />
              <CustomLinkButton
                text={t('forgetPasswordText')}
                onPress={() => {}}
              />
            </View>

            <CustomSubmitButton label={t('loginText')} />
          </CustomForm>
        </View>
      </View>

      <CustomFooter
        text={t('doNotHaveAccountText')}
        actionButtonText={t('createAccountText')}
        onActionButtonPress={() =>
          navigation.navigate(routes.CREATE_ACCOUNT_SCREEN)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 0,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default LoginScreen;
