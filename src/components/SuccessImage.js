import React from 'react';
import { Image, StyleSheet } from 'react-native';

const SuccessImage = ({ source, width, height }) => {
  return <Image source={source} style={[styles.image, { width, height }]} />;
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});

export default SuccessImage;
