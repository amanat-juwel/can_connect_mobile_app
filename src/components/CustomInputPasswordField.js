// CustomInputPasswordField.js

import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons

const CustomInputPasswordField = ({ placeholder, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={togglePasswordVisibility}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 60,
    borderColor: '#00A75A',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomInputPasswordField;
