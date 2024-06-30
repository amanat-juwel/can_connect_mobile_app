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
  ...otherProps
}) => {
  const styleArray = [styles.input, { height, width, marginBottom, marginTop }];
  if (otherProps.multiline) {
    styleArray.push({ textAlignVertical: 'top', paddingTop: 10 });
  }
  return (
    <TextInput
      style={styleArray}
      placeholder={placeholder}
      placeholderTextColor={colors.lightGrey}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={value}
      onBlur={onBlur}
      keyboardType={keyboardType}
      {...otherProps}
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
