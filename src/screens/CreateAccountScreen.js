import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import CanConnectLogo from '../components/CanConnectLogo';
import { useTranslation } from 'react-i18next';
import {
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import CustomFooter from '../components/CustomFooter';
import routes from '../Navigation/routes';
import colors from '../constants/colors';

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

const CreateAccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isCollector, setIsCollector] = useState(true);
  const [isRecycle, setIsRecycle] = useState(false);

  const { width, height } = Dimensions.get('window');
  const imageWidth = width * 0.38 * 0.8;
  const imageHeight = imageWidth * (138 / 184);

  const cities = [
    {
      id: 1,
      name: 'Newcastle',
      state_id: 1,
    },
    {
      id: 2,
      name: 'Wollongong',
      state_id: 1,
    },
  ];
  const states = [
    {
      id: 1,
      name: 'New South Wales',
    },
    {
      id: 2,
      name: 'Victoria',
    },
    {
      id: 3,
      name: 'Queensland',
    },
    {
      id: 4,
      name: 'Western Australia',
    },
    {
      id: 5,
      name: 'South Australia',
    },
    {
      id: 6,
      name: 'Tasmania',
    },
  ];

  const handleSignUp = (data) => {
    console.log(data);
    // Implement signup logic here
  };
  const handlePress = () => {
    // Open the link in the browser
    Linking.openURL('https://www.google.com/');
  };

  const handleUserType = () => {
    setIsCollector((prev) => !prev);
    setIsRecycle((prev) => !prev);
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
                  isChecked={isCollector}
                  onPress={handleUserType}
                />
              </View>
              <View style={{ width: '50%', paddingEnd: 4 }}>
                <CustomCheckBox
                  title={t('requestorText')}
                  isChecked={isRecycle}
                  onPress={handleUserType}
                />
              </View>
            </View>
            <CustomSubmitButton label={t('createAccountButtonText')} />
          </CustomForm>
        </View>

        <CustomFooter
          text={t('agreementText')}
          actionButtonText={t('termsAndConditionText')}
          color={colors.black}
          textDecorationLine="underline"
          onActionButtonPress={() => {}}
        />
        <CustomFooter
          text={t('alreadyHaveAccountText')}
          actionButtonText={t('loginText')}
          onActionButtonPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
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
    backgroundColor: '#fff',
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

export default CreateAccountScreen;
