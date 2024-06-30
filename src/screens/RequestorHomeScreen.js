import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import routes from '../Navigation/routes';
import colors from '../constants/colors';

const RequestorHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
});

export default RequestorHomeScreen;
