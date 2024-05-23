import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomLinkButton = ({ text, onPress, LinkColor = 'blue' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: LinkColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomLinkButton;
