import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import routes from '../Navigation/routes';
import CustomLabel from '../components/CustomLabel';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import {
  CustomErrorMessage,
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import CustomFormDatePicker from '../components/forms/CustomFormDatePicker';
import publicApi from '../api/public';
import useAuth from '../auth/useAuth';
import { MaterialIcons } from '@expo/vector-icons';
import CustomPopUpMap from '../components/CustomPopUpMap';
import CustomCheckBox from '../components/CustomCheckBox';
import requestorApi from '../api/requestor';

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
  const [isDonation, setIsDonation] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [requestFailed, setRequestFailed] = useState();

  const { t } = useTranslation();

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

  const createRequest = async (data) => {
    const { state, city, ...otherFields } = data;
    const payload = {
      ...otherFields,
      state_id: state.id,
      city_id: city.id,
      items: route.params.items,
      location_latitude: markerPosition?.latitude,
      location_longitude: markerPosition?.longitude,
      is_donation: isDonation ? 1 : 0,
    };

    console.log('payload', payload);

    const result = await requestorApi.storeRequest(payload);
    console.log('result', result.data);
    if (!result.ok || !result.data.success) {
      setErrorMessage(result.data.errorMessage[0]);
      setRequestFailed(true);
      return;
    }
    setRequestFailed(false);
    console.log('request', result.data.data);

    navigation.navigate(routes.PICKUP_APPOINTMENT_SCREEN, {
      sku: result.data.data.sku,
    });
  };

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
        <View style={styles.rowContainer}>
          <View style={{ width: '50%', paddingEnd: 4 }}>
            <CustomFormPicker
              name="state"
              items={states}
              label={t('statePickerLabel')}
              onchange={(data) => getCities(data.id)}
              clearField="city"
              height={40}
            />
          </View>
          <View style={{ width: '50%', paddingStart: 4 }}>
            <CustomFormPicker
              name="city"
              items={cities}
              label={t('cityPickerLabel')}
              height={40}
            />
          </View>
        </View>
        <CustomPopUpMap
          setMarkerPosition={setMarkerPosition}
          markerPosition={markerPosition}
          onClose={() => {
            setShowMap(false);
          }}
          modalVisible={showMap}
          title={t('SelectLocationText')}
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
        <View style={styles.mapRow}>
          <TouchableOpacity
            style={styles.leftContainer}
            onPress={() => {
              setShowMap(true);
            }}
          >
            <MaterialIcons
              name="location-pin"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.text}>
              {markerPosition ? t('changeLocation') : t('selectOnMapText')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMarkerPosition(null);
            }}
          >
            <Text style={styles.clearText}>{t('ClearText')}</Text>
          </TouchableOpacity>
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
          multiline
          numberOfLines={4}
        />
        <View style={styles.donationContainer}>
          <CustomCheckBox
            title={t('DonationText')}
            isChecked={isDonation}
            onPress={setIsDonation}
          />
        </View>
        <CustomErrorMessage error={errorMessage} visible={requestFailed} />
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
  mapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  clearText: {
    color: colors.primary,
    paddingEnd: 10,
  },
  donationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
});

export default RecycleScreen;
