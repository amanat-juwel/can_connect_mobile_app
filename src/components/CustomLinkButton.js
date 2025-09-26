import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const CustomLinkButton = ({
  text,
  onPress,
  LinkColor = colors.primary,
  fontSize = 16,
  fontWeight = '600',
  icon,
  iconPosition = 'right',
  disabled = false,
  style,
  textStyle,
  showUnderline = true,
  padding = 12,
  borderRadius = 8,
  backgroundColor = 'transparent',
  borderWidth = 0,
  borderColor = 'transparent',
}) => {
  const buttonStyle = [
    styles.container,
    {
      padding,
      borderRadius,
      backgroundColor,
      borderWidth,
      borderColor,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const textStyleCombined = [
    styles.text,
    {
      color: LinkColor,
      fontSize,
      fontWeight,
      textDecorationLine: showUnderline ? 'underline' : 'none',
    },
    textStyle,
  ];

  const renderContent = () => {
    if (icon) {
      if (iconPosition === 'left') {
        return (
          <View style={styles.contentWithIcon}>
            <MaterialIcons name={icon} size={20} color={LinkColor} />
            <Text style={textStyleCombined}>{text}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.contentWithIcon}>
            <Text style={textStyleCombined}>{text}</Text>
            <MaterialIcons name={icon} size={20} color={LinkColor} />
          </View>
        );
      }
    }
    return <Text style={textStyleCombined}>{text}</Text>;
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Minimum touch target size
  },
  text: {
    textAlign: 'center',
  },
  contentWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomLinkButton;
