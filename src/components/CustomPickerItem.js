import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomPickerItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomPickerItem;
