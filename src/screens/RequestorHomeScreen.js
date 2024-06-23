import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const RequestorHomeScreen = ({ navigation }) => {
  return (
    <View>
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

export default RequestorHomeScreen;
