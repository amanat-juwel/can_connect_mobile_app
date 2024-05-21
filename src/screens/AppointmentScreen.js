import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const AppointmentScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Appointment Screen</Text>
      <Button
        title="Go to Welcome Screen"
        onPress={() => navigation.navigate(routes.WELCOME_SCREEN)}
      />
    </View>
  );
};

export default AppointmentScreen;
