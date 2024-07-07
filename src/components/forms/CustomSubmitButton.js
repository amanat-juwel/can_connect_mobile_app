import React from 'react';
import { useFormikContext } from 'formik';
import CustomButton from '../CustomButton';

const CustomSubmitButton = ({
  label,
  width = '100%',
  color,
  isResetButton = false,
}) => {
  const { handleSubmit, handleReset } = useFormikContext();

  return (
    <CustomButton
      label={label}
      onPress={isResetButton ? handleReset : handleSubmit}
      style={width}
      color={color}
    />
  );
};

export default CustomSubmitButton;
