import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const CustomInputTextField = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
  keyboardType,
  onBlur,
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  return (
    <TextInput
      style={[styles.input, { height, width, marginBottom, marginTop }]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={value}
      onBlur={onBlur}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CustomInputTextField;
