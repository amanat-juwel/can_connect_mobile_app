import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';
import CustomFormDatePicker from './forms/CustomFormDatePicker';
import {
  CustomForm,
  CustomFormField,
  CustomFormPicker,
  CustomSubmitButton,
} from './forms';
import publicApi from '../api/public';
import CustomLinkButton from './CustomLinkButton';
import { MaterialIcons } from '@expo/vector-icons';

const initialFormValues = {
  preferred_pick_date_from: '',
  preferred_pick_date_to: '',
  state: undefined,
  city: undefined,
  postal_code: '',
  status: undefined,
};

const FilterComponent = ({ applyFilter, includeStatus = true }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statuses, setStatuses] = useState([]);
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

  const getStatuses = async () => {
    const result = await publicApi.getConstants();
    if (result.ok && result.data.success) {
      const capitalizedStatuses = result.data.data.status.map(
        (status, index) => {
          return {
            id: index,
            name: status.charAt(0).toUpperCase() + status.slice(1),
          };
        },
      );
      setStatuses(capitalizedStatuses);
    }
  };

  useEffect(() => {
    getStates();
    getStatuses();
  }, []);

  const handleFilterVisibility = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterToggleContainer}>
        <View style={styles.row}>
          <MaterialIcons
            name={showFilter ? 'filter-list-off' : 'filter-list'}
            size={16}
            color={colors.blue}
          />
          <CustomLinkButton
            text={showFilter ? t('HideFilterText') : t('ApplyFilterText')}
            fontWeight="bold"
            onPress={handleFilterVisibility}
          />
        </View>
      </View>
      {showFilter && (
        <CustomForm initialValues={initialFormValues} onSubmit={applyFilter}>
          <View style={styles.rowContainer}>
            <View style={styles.columnLeft}>
              <CustomFormDatePicker
                name="preferred_pick_date_from"
                label={t('PickupDateFromText')}
                errorMessage={t('PickupDateErrorMessage')}
                mode="date"
                height={40}
              />
            </View>
            <View style={styles.columnRight}>
              <CustomFormDatePicker
                name="preferred_pick_date_to"
                label={t('PickupDateToText')}
                errorMessage={t('PickupTimeErrorMessage')}
                mode="date"
                height={40}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.columnLeft}>
              <CustomFormPicker
                name="state"
                items={states}
                label={t('statePickerLabel')}
                onchange={(data) => getCities(data.id)}
                clearField="city"
                height={40}
              />
            </View>
            <View style={styles.columnRight}>
              <CustomFormPicker
                name="city"
                items={cities}
                label={t('cityPickerLabel')}
                height={40}
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.columnLeft}>
              <CustomFormField
                name="postal_code"
                placeholder={t('postalCodeText')}
                errorMessage={t('postalCodeErrorMessage')}
                height={40}
              />
            </View>
            <View style={styles.columnRight}>
              {includeStatus && (
                <CustomFormPicker
                  name="status"
                  items={statuses}
                  label={t('statusPickerLabel')}
                  height={40}
                />
              )}
            </View>
          </View>
          <View
            style={[
              styles.buttonContainer,
              { marginTop: includeStatus ? 0 : 55 },
            ]}
          >
            <View style={styles.columnLeft}>
              <CustomSubmitButton label={t('ApplyText')} />
            </View>
            <View style={styles.columnRight}>
              <CustomSubmitButton
                label={t('ClearText')}
                color={colors.red}
                isResetButton
              />
            </View>
          </View>
        </CustomForm>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    flex: 1,
    marginRight: 5,
  },
  columnRight: {
    flex: 1,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginRight: 5,
  },
  filterToggleContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FilterComponent;
