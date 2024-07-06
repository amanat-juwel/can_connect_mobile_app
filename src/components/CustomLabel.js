import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const CustomLabel = ({
  text,
  size = 25,
  weight = '500',
  color = colors.black,
}) => {
  return (
    <View style={styles.labelContainer}>
      <Text
        style={[styles.Label, { fontSize: size, fontWeight: weight, color }]}
      >
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  Label: {
    marginTop: 10,
  },
});

export default CustomLabel;
