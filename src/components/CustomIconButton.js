import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const CustomIconButton = ({
  onPress,
  iconName,
  label,
  iconSize = 20,
  iconColor = colors.primary,
  buttonType = 'normal',
}) => {
  let buttonRadiusStyle = {};
  const borderRadius = 8;
  if (buttonType === 'top') {
    buttonRadiusStyle = {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  }
  if (buttonType === 'bottom') {
    buttonRadiusStyle = {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    };
  }
  if (buttonType === 'normal') {
    buttonRadiusStyle = {
      borderRadius: borderRadius,
    };
  }
  return (
    <TouchableOpacity
      style={[styles.button, buttonRadiusStyle]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  iconContainer: {
    marginRight: 10,
  },
  label: {
    color: colors.black,
    fontSize: 16,
  },
});

export default CustomIconButton;
