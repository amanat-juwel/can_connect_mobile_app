import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomErrorMessage from './CustomErrorMessage';
import CustomPicker from '../CustomPicker';

const CustomFormPicker = ({
  name,
  items,
  label,
  onchange,
  clearField,
  ...otherProps
}) => {
  const { setFieldValue, errors, values, touched, initialValues } =
    useFormikContext();
  const { t } = useTranslation();

  const onSelectItem = (item) => {
    setFieldValue(name, item);

    if (onchange) onchange(item);

    if (clearField) setFieldValue(clearField, initialValues[clearField]);
  };

  return (
    <>
      <CustomPicker
        items={items}
        onSelectItem={onSelectItem}
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
