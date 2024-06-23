import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  CustomErrorMessage,
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import colors from '../constants/colors';
import publicApi from '../api/public';
import registrationApi from '../api/registration';
import useAuth from '../auth/useAuth';
import routes from '../Navigation/routes';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  password: Yup.string(),
  c_password: Yup.string().when('password', {
    is: (password) => password?.length > 0,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  state: Yup.object().required(),
  city: Yup.object().required(),
  postal_code: Yup.number().required(),
  street_address: Yup.string().required(),
});

const EditProfileScreen = () => {
  const [updateFailed, setUpdateFailed] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user, setContextUser } = useAuth();

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
    getCities(user.state_id);
  }, []);

  const handleSignUp = async (data) => {
    const { state, city, password, c_password, ...otherFields } = data;
    const payload = {
      ...otherFields,
      phone: user.phone,
      state_id: state.id,
      city_id: city.id,
    };
    if (password && c_password) {
      payload.password = password;
      payload.c_password = c_password;
    }
    updateProfile(payload);
  };

  const updateProfile = async (payload) => {
    console.log('user', user);
    const result = await registrationApi.updateProfile(payload);
    if (!result.ok || !result.data.success) return setUpdateFailed(true);
    setUpdateFailed(false);
    console.log('result.data', result.data);
    setContextUser(result.data.data.user);
    navigation.navigate(routes.PROFILE_SCREEN);
  };

  let initialFormValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    password: '',
    c_password: '',
    state: { id: user.state_id, name: user.state_name },
    city: {
      id: user.city_id,
      name: user.city_name,
      state_id: user.state_id,
    },
    postal_code: user.postal_code,
    street_address: user.street_address,
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.textContainer}></View>
        <View style={styles.formContainer}>
          {states.length > 0 && (
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
                clearFieldValue={null}
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

              <CustomErrorMessage
                error={t('profileUpdateFailedMessage')}
                visible={updateFailed}
              />
              <CustomSubmitButton label={t('updateProfileText')} />
            </CustomForm>
          )}
        </View>
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
});

export default EditProfileScreen;
