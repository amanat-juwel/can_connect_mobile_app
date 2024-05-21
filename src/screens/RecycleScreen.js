import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const RecycleScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Recycle Screen</Text>
      <Button
        title="Go to Schedule Screen"
        onPress={() => navigation.navigate(routes.SCHEDULE_SCREEN)}
      />
    </View>
  );
};

export default RecycleScreen;
