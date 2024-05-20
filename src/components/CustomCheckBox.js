import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const CustomCheckBox = ({ title, checked = false, onPress = () => {}, checkedColor = '#00A75A' }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: checked ? checkedColor : '#00A75A',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {checked && (
            <Text
              style={{
                fontSize: 18,
                color: checkedColor,
                fontWeight: 'bold',
              }}
            >
              👍
            </Text>
          )}
        </View>
        <Text style={{ marginLeft: 8 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
