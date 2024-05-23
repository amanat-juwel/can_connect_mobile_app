import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const CustomInputPasswordField = ({ placeholder, onChangeText, value }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        value={value}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 60,
    borderColor: colors.primary,
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
