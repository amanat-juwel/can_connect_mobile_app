import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomErrorMessage from './CustomErrorMessage';
import CustomPicker from '../CustomPicker';

const CustomFormPicker = ({ name, items, label, ...otherProps }) => {
  const { setFieldValue, errors, values, touched } = useFormikContext();
  const { t } = useTranslation();
  return (
    <>
      <CustomPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        label={label}
        selectedItem={values[name]}
        {...otherProps}
      />
      <CustomErrorMessage
        error={errors[name] && t('pickerErrorMessage')}
        visible={touched[name]}
      />
    </>
  );
};

export default CustomFormPicker;
