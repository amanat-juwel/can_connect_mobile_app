import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInputTextField = ({ placeholder, onChangeText, secureTextEntry, value, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
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
    height: 60,
    borderColor: '#00A75A',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
});

export default CustomInputTextField;
