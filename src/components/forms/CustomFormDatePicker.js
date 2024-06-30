import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import CustomErrorMessage from './CustomErrorMessage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../constants/colors';

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

  const { setFieldValue, errors, touched, values } = useFormikContext();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const getFormattedTime = (isoTime) => {
    const date = new Date(`1970-01-01T${isoTime}`);

    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return date.toLocaleTimeString(undefined, options);
  };

  const handleConfirm = (dateTime) => {
    let result = dateTime;
    if (mode === 'date') {
      result = dateTime.toISOString().split('T')[0];
    }
    if (mode === 'time') {
      result = getFormattedTime(dateTime.toISOString().split('T')[1]);
    }

    if (onchange) onchange(result);
    setFieldValue(name, result);
    hideDatePicker();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View
          style={[styles.container, { height, width, marginBottom, marginTop }]}
        >
          <Text style={styles.label}>
            {values[name] ? values[name] : label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        {...otherProps}
      />
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
});

export default CustomFormDatePicker;
