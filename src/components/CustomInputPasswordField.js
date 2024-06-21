import React, { useState } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const CustomInputPasswordField = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[styles.container, { height, width, marginBottom, marginTop }]}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGrey}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible}
        value={value}
        onBlur={onBlur}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
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
    borderColor: colors.primary,
    borderWidth: 1,
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
