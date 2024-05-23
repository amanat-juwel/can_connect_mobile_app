import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../constants/colors';

const CustomCheckBox = ({ title, isChecked = false, onPress = () => {} }) => {
  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={onPress}
        color={isChecked ? colors.primary : undefined}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  checkbox: {
    marginRight: 8,
  },
});

export default CustomCheckBox;
