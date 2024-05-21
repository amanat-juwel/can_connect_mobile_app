import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const ScheduleScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Schedule Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate(routes.HOME_SCREEN)}
      />
    </View>
  );
};

export default ScheduleScreen;
