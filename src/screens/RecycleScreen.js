import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import routes from '../Navigation/routes';
import CustomLabel from '../components/CustomLabel';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import {
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import CustomFormDatePicker from '../components/forms/CustomFormDatePicker';
import publicApi from '../api/public';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  preferred_pick_date: Yup.string().required(),
  preferred_pick_time: Yup.string().required(),
  state: Yup.object().required(),
  city: Yup.object().required(),
  postal_code: Yup.string().required(),
  street_address: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .required(),
  note: Yup.string(),
});

const RecycleScreen = ({ navigation, route }) => {
  const { user } = useAuth();

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

  const handleDateChange = (date) => {
    console.log(date);
  };

  const createRequest = (data) => {
    console.log('data', data);
  };

  const { t } = useTranslation();
  console.log('user', user);
  const initialFormValues = {
    preferred_pick_date: '',
    preferred_pick_time: '',
    state: { id: user.state_id, name: user.state_name },
    city: {
      id: user.city_id,
      name: user.city_name,
      state_id: user.state_id,
    },
    postal_code: user.postal_code,
    street_address: user.street_address,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    phone: user.phone,
    note: '',
  };

  return (
    <ScrollView style={styles.container}>
      <CustomForm
        initialValues={initialFormValues}
        onSubmit={createRequest}
        validationSchema={validationSchema}
      >
        <CustomLabel
          text={t('PickupDetailsText')}
          color={colors.primary}
          size={18}
          weight="700"
        />
        <View style={styles.rowContainer}>
          <View style={{ width: '50%', paddingEnd: 4 }}>
            <CustomFormDatePicker
              name="preferred_pick_date"
              label={t('PickupDateText')}
              errorMessage={t('PickupDateErrorMessage')}
              onchange={(date) => handleDateChange(date)}
              mode="date"
              minimumDate={new Date()}
              height={40}
            />
          </View>
          <View style={{ width: '50%', paddingStart: 4 }}>
            <CustomFormDatePicker
              name="preferred_pick_time"
              label={t('PickupTimeText')}
              errorMessage={t('PickupTimeErrorMessage')}
              onchange={(date) => handleDateChange(date)}
              mode="time"
              height={40}
            />
          </View>
        </View>
        <CustomFormPicker
          name="state"
          items={states}
          label={t('statePickerLabel')}
          onchange={(data) => getCities(data.id)}
          clearField="city"
          height={40}
        />
        <CustomFormPicker
          name="city"
          items={cities}
          label={t('cityPickerLabel')}
          height={40}
        />
        <View style={styles.rowContainer}>
          <View style={{ width: '50%', paddingEnd: 4 }}>
            <CustomFormField
              name="postal_code"
              placeholder={t('postalCodeText')}
              errorMessage={t('postalCodeErrorMessage')}
              height={40}
            />
          </View>
          <View style={{ width: '50%', paddingStart: 4 }}>
            <CustomFormField
              name="street_address"
              placeholder={t('streetAddressText')}
              errorMessage={t('streetAddressErrorMessage')}
              height={40}
            />
          </View>
        </View>

        <CustomLabel
          text={t('ContactDetailsText')}
          color={colors.primary}
          size={18}
          weight="700"
        />
        <CustomFormField
          name="name"
          placeholder={t('nameText')}
          errorMessage={t('nameErrorMessage')}
          height={40}
        />
        <View style={styles.rowContainer}>
          <View style={{ width: '50%', paddingEnd: 4 }}>
            <CustomFormField
              name="email"
              placeholder={t('emailText')}
              errorMessage={t('emailErrorMessage')}
              height={40}
            />
          </View>
          <View style={{ width: '50%', paddingStart: 4 }}>
            <CustomFormField
              name="phone"
              placeholder={t('phoneText')}
              errorMessage={t('phoneErrorMessage')}
              height={40}
            />
          </View>
        </View>

        <CustomLabel
          text={t('additionalDetailsText')}
          color={colors.primary}
          size={18}
          weight="700"
        />
        <CustomFormField
          name="note"
          placeholder={t('notePlaceHolderText')}
          errorMessage={t('noteErrorMessage')}
          height={100}
          multiline // Enables multiline input
          numberOfLines={4} // Optionally limit number of lines
        />
        <CustomSubmitButton label={t('RequestText')} />
      </CustomForm>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: { width: '50%', paddingEnd: 4 },
});

export default RecycleScreen;
