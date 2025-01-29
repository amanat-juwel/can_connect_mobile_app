import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import CustomGoogleAutoCompleteField from '../CustomGoogleAutoCompleteField';
import CustomErrorMessage from './CustomErrorMessage';

const CustomGoogleAutoCompleteFormField = ({
  name,
  errorMessage,
  ...otherProps
}) => {
  const { setFieldValue, errors, setFieldTouched, touched, values } =
    useFormikContext();

  const handleChange = React.useCallback(
    (value) => {
      setFieldValue(name, value);
    },
    [setFieldValue, name],
  );

  const handleBlur = React.useCallback(() => {
    setFieldTouched(name, true);
  }, [setFieldTouched, name]);

  return (
    <View style={styles.container}>
      <CustomGoogleAutoCompleteField
        onBlur={handleBlur}
        onChangeText={handleChange}
        value={values[name]}
        {...otherProps}
      />
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

export default CustomGoogleAutoCompleteFormField;
