import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const CustomFooter = ({
  text,
  actionButtonText,
  onActionButtonPress,
  ...actionButtonStyles
}) => {
  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.textContainer}>
        {text}{' '}
        <Text
          style={[styles.actionButtonStyle, { ...actionButtonStyles }]}
          onPress={onActionButtonPress}
        >
          {actionButtonText}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    justifyContent: 'flex-end',
  },
  textContainer: {
    fontSize: 15,
  },
  actionButtonStyle: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default CustomFooter;
