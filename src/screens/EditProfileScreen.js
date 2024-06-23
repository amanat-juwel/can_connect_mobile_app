import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import CanConnectLogo from '../components/CanConnectLogo';
import { useTranslation } from 'react-i18next';
import {
  CustomErrorMessage,
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import CustomFooter from '../components/CustomFooter';
import routes from '../Navigation/routes';
import colors from '../constants/colors';
import userTypes from '../constants/userType';
import publicApi from '../api/public';
import registrationApi from '../api/registration';
import authApi from '../api/auth';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .required(),
  password: Yup.string().required(),
  c_password: Yup.string().required(),
  state: Yup.object().required(),
  city: Yup.object().required(),
  postal_code: Yup.number().required(),
  street_address: Yup.string().required(),
});

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  c_password: '',
  state: null,
  city: null,
  postal_code: null,
  street_address: '',
};

const EditProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [registrationFailed, setRegistrationFailed] = useState();
  const [userType, setUserType] = useState(userTypes.COLLECTOR);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const getStates = async () => {
    const result = await publicApi.getStates();
    if (result.ok && result.data.success) {
      setStates(result.data.data);
    }
  };

  const getCities = async (stateId) => {
    const result = await publicApi.getCities(stateId);
    if (result.ok && result.data.success) {
      setCities(result.data.data);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  const handleSignUp = async (data) => {
    const { state, city, ...otherFields } = data;
    const payload = {
      ...otherFields,
      state_id: state.id,
      city_id: city.id,
      category: userType,
    };

    if (userType === userTypes.REQUESTOR) {
      await registerRequestor(payload);
    } else {
      navigation.navigate(routes.COLLECTOR_QUESTIONNAIRE, { payload });
    }
  };

  const registerRequestor = async (payload) => {
    const result = await registrationApi.registerUser(payload);
    if (!result.ok || !result.data.success) return setRegistrationFailed(true);
    setRegistrationFailed(false);
    const requestOtpResult = await authApi.requestOtp(
      payload.phone,
      payload.email,
    );
    if (!requestOtpResult.ok || !requestOtpResult.data.success)
      return setRegistrationFailed(true);
    setRegistrationFailed(false);
    navigation.navigate(routes.OTP_SCREEN, { id: data.phone });
  };

  const showTermsAndConditions = () => {};

  const handleUserType = () => {
    setUserType((prev) => {
      if (prev === userTypes.COLLECTOR) {
        return userTypes.REQUESTOR;
      } else {
        return userTypes.COLLECTOR;
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CanConnectLogo />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>{t('createAccountText')}</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomForm
            initialValues={initialFormValues}
            onSubmit={handleSignUp}
            validationSchema={validationSchema}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ width: '50%', paddingEnd: 4 }}>
                <CustomFormField
                  name="first_name"
                  placeholder={t('firstNameText')}
                  errorMessage={t('firstNameErrorMessage')}
                />
              </View>
              <View style={{ width: '50%', paddingStart: 4 }}>
                <CustomFormField
                  name="last_name"
                  placeholder={t('lastNameText')}
                  errorMessage={t('LastNameErrorMessage')}
                />
              </View>
            </View>
            <CustomFormField
              name="email"
              placeholder={t('emailText')}
              errorMessage={t('emailErrorMessage')}
            />
            <CustomFormField
              name="phone"
              placeholder={t('phoneText')}
              errorMessage={t('phoneErrorMessage')}
            />
            <CustomFormField
              name="password"
              placeholder={t('PasswordText')}
              isPasswordField
              errorMessage={t('passwordErrorMessage')}
            />
            <CustomFormField
              name="c_password"
              placeholder={t('confirmPasswordText')}
              isPasswordField
              errorMessage={t('confirmPasswordErrorMessage')}
            />

            <CustomFormPicker
              name="state"
              items={states}
              label={t('statePickerLabel')}
              onchange={(data) => getCities(data.id)}
              clearField="city"
            />

            <CustomFormPicker
              name="city"
              items={cities}
              label={t('cityPickerLabel')}
            />

            <CustomFormField
              name="postal_code"
              placeholder={t('postalCodeText')}
              errorMessage={t('postalCodeErrorMessage')}
            />

            <CustomFormField
              name="street_address"
              placeholder={t('streetAddressText')}
              errorMessage={t('streetAddressErrorMessage')}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginBottom: 20,
              }}
            >
              <View style={{ width: '50%', paddingEnd: 4 }}>
                <CustomCheckBox
                  title={t('collectorText')}
                  isChecked={userType === userTypes.COLLECTOR}
                  onPress={handleUserType}
                />
              </View>
              <View style={{ width: '50%', paddingEnd: 4 }}>
                <CustomCheckBox
                  title={t('requestorText')}
                  isChecked={userType === userTypes.REQUESTOR}
                  onPress={handleUserType}
                />
              </View>
            </View>
            <CustomErrorMessage
              error={t('registrationFailedMessage')}
              visible={registrationFailed}
            />
            <CustomSubmitButton
              label={
                userType === userTypes.COLLECTOR
                  ? t('continueText')
                  : t('createAccountButtonText')
              }
            />
          </CustomForm>
        </View>

        <CustomFooter
          text={t('agreementText')}
          actionButtonText={t('termsAndConditionText')}
          color={colors.black}
          textDecorationLine="underline"
          onActionButtonPress={showTermsAndConditions}
        />
        <CustomFooter
          text={t('alreadyHaveAccountText')}
          actionButtonText={t('loginText')}
          onActionButtonPress={() =>
            navigation.navigate(routes.VERIFY_PHONE_NUMBER_SCREEN)
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  logInText: {
    fontWeight: 'bold',
    color: '#00A75A',
  },
});

export default EditProfileScreen;
