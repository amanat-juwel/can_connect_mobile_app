import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import routes from '../Navigation/routes';
import colors from '../constants/colors';
import commonApi from '../api/common';

const CollectorHomeScreen = ({ navigation }) => {
  const [homePageSlider, setHomePageSlider] = useState([]);

  const getDashboardData = async () => {
    const result = await commonApi.getHomePage();
    if (result.ok && result.data.success) {
      setHomePageSlider(result.data.data.slider);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  console.log(homePageSlider[0] && homePageSlider[0].image);
  return (
    <View style={styles.container}>
      <View style={styles.topRectangle} />
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: homePageSlider[0] && homePageSlider[0].image,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text>Collector Home Screen</Text>
      <Button
        title="Go to Recycle Screen"
        onPress={() => navigation.navigate(routes.RECYCLE_SCREEN)}
      />
      <View style={{ height: 20 }}></View>
      <Button
        title="Go to Pickup Appointment"
        onPress={() => navigation.navigate(routes.PICKUP_APPOINTMENT_SCREEN)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRectangle: {
    width: '100%',
    height: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CollectorHomeScreen;
