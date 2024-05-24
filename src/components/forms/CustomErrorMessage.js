import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../constants/colors';

const CustomErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;

  return <Text style={styles.errorMessage}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.red,
    marginBottom: 15,
    marginStart: 2,
  },
});

export default CustomErrorMessage;
