import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomInputPasswordField from '../CustomInputPasswordField';
import CustomInputTextField from '../CustomInputTextField';
import ErrorMessage from './ErrorMessage';

const CustomFormField = ({ name, isPasswordField = false, ...otherProps }) => {
  const { handleChange, errors, setFieldTouched, touched } = useFormikContext();
  const { t } = useTranslation();

  return (
    <>
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
          {...otherProps}
        />
      )}
      <ErrorMessage
        error={errors[name] && t('idErrorMessage')}
        visible={touched[name]}
      />
    </>
  );
};

export default CustomFormField;
