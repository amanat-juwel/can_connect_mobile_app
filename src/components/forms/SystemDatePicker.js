import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import CustomErrorMessage from './CustomErrorMessage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Platform } from 'react-native';
import colors from '../../constants/colors';

const SystemDatePicker = ({
  name,
  label,
  errorMessage,
  onchange,
  mode = 'date',
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
  minimumDate,
  maximumDate,
  ...otherProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { setFieldValue, errors, touched, values } = useFormikContext();

  const getDisplayValue = () => {
    try {
      const value = values[name];
      if (!value || value === '' || typeof value !== 'string') {
        return label;
      }

      if (mode === 'date') {
        const [year, month, day] = value.split('-');
        if (year && month && day) {
          return `${day}/${month}/${year}`;
        }
      }

      return value;
    } catch (error) {
      return label;
    }
  };

  // Show the picker
  const showPicker = () => {
    setIsVisible(true);
  };

  // Handle date/time change
  const handleChange = (event, selectedDate) => {
    // On Android, the picker automatically closes
    if (Platform.OS === 'android') {
      setIsVisible(false);
    }

    if (selectedDate) {
      setCurrentDate(selectedDate);
      
      let result = '';
      
      if (mode === 'date') {
        // Format as YYYY-MM-DD
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        result = `${year}-${month}-${day}`;
      } else if (mode === 'time') {
        // Format as HH:MM
        const hours = String(selectedDate.getHours()).padStart(2, '0');
        const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
        result = `${hours}:${minutes}`;
      }

      if (result) {
        if (onchange) onchange(result);
        setFieldValue(name, result);
      }
    }
  };

  // Handle iOS picker confirmation
  const handleIOSConfirm = () => {
    setIsVisible(false);
  };

  // Handle iOS picker cancellation
  const handleIOSCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={showPicker}>
        <View
          style={[styles.container, { height, width, marginBottom, marginTop }]}
        >
          <Text style={styles.label}>
            {getDisplayValue()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      
      {/* System date/time picker */}
      {isVisible && (
        <DateTimePicker
          value={currentDate}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          style={Platform.OS === 'ios' ? styles.iosPicker : undefined}
          {...otherProps}
        />
      )}
      
      {/* iOS-specific buttons for confirmation/cancellation */}
      {Platform.OS === 'ios' && isVisible && (
        <View style={styles.iosButtonContainer}>
          <TouchableWithoutFeedback onPress={handleIOSCancel}>
            <View style={styles.iosButton}>
              <Text style={styles.iosButtonText}>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleIOSConfirm}>
            <View style={[styles.iosButton, styles.iosConfirmButton]}>
              <Text style={[styles.iosButtonText, styles.iosConfirmButtonText]}>Done</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
  iosButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  iosButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  iosConfirmButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iosButtonText: {
    color: colors.grey,
    fontSize: 16,
    fontWeight: '600',
  },
  iosConfirmButtonText: {
    color: colors.white,
  },
});

export default SystemDatePicker;
