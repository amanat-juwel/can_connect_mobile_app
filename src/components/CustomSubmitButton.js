import React from 'react';
import { useFormikContext } from 'formik';
import CustomButton from './CustomButton';

const CustomSubmitButton = ({ label, width = '100%' }) => {
  const { handleSubmit } = useFormikContext();

  return <CustomButton label={label} onPress={handleSubmit} style={width} />;
};

export default CustomSubmitButton;
