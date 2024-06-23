import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const DashboardScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate(routes.HOME_SCREEN)}
      />
    </View>
  );
};

export default DashboardScreen;
