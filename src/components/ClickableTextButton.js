import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';

const ClickableTextButton = ({ text, navigationPage }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(navigationPage);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
});

export default ClickableTextButton;
