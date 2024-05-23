import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const CustomInputTextField = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  value,
  keyboardType,
  height = 60,
  width = '100%',
}) => {
  return (
    <TextInput
      style={[styles.input, { height: height, width: width }]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={value}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default CustomInputTextField;
