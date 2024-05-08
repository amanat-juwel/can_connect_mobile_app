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
    height: 60,
    borderColor: '#00A75A',
    borderWidth: 1,
    marginBottom: 15,
    //paddingHorizontal: 10,
    padding: 20,
    flex:1,
    borderRadius: 10,
  },
});

export default CustomInputTextField;
