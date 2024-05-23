import React from 'react';
import { Dimensions, Image } from 'react-native';

const CanConnectLogo = ({ logoWidth, logoHeight }) => {
  const { width } = Dimensions.get('window');
  const imageWidth = width * 0.38 * 0.8;
  const imageHeight = imageWidth * (138 / 184);

  return (
    <Image
      source={require('../../assets/images/icon.png')}
      style={{
        width: logoWidth || imageWidth,
        height: logoHeight || imageHeight,
      }}
    />
  );
};

export default CanConnectLogo;
