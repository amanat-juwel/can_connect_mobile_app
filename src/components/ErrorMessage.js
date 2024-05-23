import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const ErrorMessage = ({ error, visible }) => {
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

export default ErrorMessage;
