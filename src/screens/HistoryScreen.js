import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const HistoryScreen = ({ navigation }) => {
  return (
    <View>
      <Text>History Screen</Text>
      <Button
        title="Go to Welcome Screen"
        onPress={() => navigation.navigate(routes.WELCOME_SCREEN)}
      />
    </View>
  );
};

export default HistoryScreen;
