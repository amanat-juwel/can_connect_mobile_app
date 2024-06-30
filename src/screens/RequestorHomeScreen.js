import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import routes from '../Navigation/routes';
import colors from '../constants/colors';

const RequestorHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRectangle} />
      <Text>Requestor Home Screen</Text>
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
    height: 25,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default RequestorHomeScreen;
