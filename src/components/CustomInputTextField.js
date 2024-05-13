import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInputTextField = ({ placeholder, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
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
