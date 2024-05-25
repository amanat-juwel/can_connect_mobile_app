import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomLinkButton = ({
  text,
  onPress,
  LinkColor = 'blue',
  fontSize = 14,
  fontWeight = 'normal',
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: LinkColor, fontSize, fontWeight }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomLinkButton;
