import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Recycle Screen"
        onPress={() => navigation.navigate(routes.RECYCLE_SCREEN)}
      />
    </View>
  );
};

export default HomeScreen;
