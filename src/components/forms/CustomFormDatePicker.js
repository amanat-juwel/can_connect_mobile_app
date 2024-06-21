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
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { setFieldValue, errors, touched, values } = useFormikContext();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const dob = date.toISOString().split('T')[0];
    if (onchange) onchange(dob);
    setFieldValue(name, dob);
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
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
  },
  label: {
    width: '85%',
    paddingVertical: 20,
    color: colors.grey,
  },
});

export default CustomFormDatePicker;
