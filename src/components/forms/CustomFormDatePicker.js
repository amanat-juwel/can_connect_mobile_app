import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import CustomErrorMessage from './CustomErrorMessage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Platform } from 'react-native';
import colors from '../../constants/colors';
import { safeFormatDate, isDateValid } from '../../utility/date.helper';

const CustomFormDatePicker = ({
  name,
  label,
  errorMessage,
  onchange,
  mode = 'date',
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
  ...otherProps
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { setFieldValue, errors, touched, values } = useFormikContext();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle date/time change using system picker
  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      setDatePickerVisibility(false);
    }
    
    if (date) {
      setSelectedDate(date);
      
      // Validate the date safely
      if (!isDateValid(date)) {
        console.warn('Invalid date received from system picker');
        return;
      }

      let result = '';
      
      if (mode === 'date') {
        result = safeFormatDate(date, 'date');
      } else if (mode === 'time') {
        result = safeFormatDate(date, 'time');
      }

      if (result) {
        if (onchange) onchange(result);
        setFieldValue(name, result);
      }
    }
  };

  // Safe display value that won't cause errors
  const getDisplayValue = () => {
    try {
      const value = values[name];
      if (value && value !== '' && typeof value === 'string') {
        return value;
      }
      return label;
    } catch (error) {
      console.warn('Display value error:', error);
      return label;
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View
          style={[styles.container, { height, width, marginBottom, marginTop }]}
        >
          <Text style={styles.label}>
            {getDisplayValue()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      
      {/* System-provided date/time picker */}
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
          {...otherProps}
        />
      )}
      
      <CustomErrorMessage
        error={errors[name] && errorMessage}
        visible={touched[name]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
  },
  label: {
    width: '85%',
    color: colors.grey,
  },
  iosPicker: {
    width: '100%',
    marginTop: 10,
  },
});

export default CustomFormDatePicker;
