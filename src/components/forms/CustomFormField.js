import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomInputPasswordField from '../CustomInputPasswordField';
import CustomInputTextField from '../CustomInputTextField';
import CustomErrorMessage from './CustomErrorMessage';
import { StyleSheet, View } from 'react-native';

const CustomFormField = ({
  name,
  isPasswordField = false,
  errorMessage,
  ...otherProps
}) => {
  const { handleChange, errors, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <View style={styles.container}>
      {isPasswordField ? (
        <CustomInputPasswordField
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          {...otherProps}
        />
      ) : (
        <CustomInputTextField
          onBlur={() => setFieldTouched(name)}
          onChangeText={handleChange(name)}
          value={values[name]}
          {...otherProps}
        />
      )}
      <CustomErrorMessage
        error={errors[name] && errorMessage}
        visible={touched[name]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default CustomFormField;
