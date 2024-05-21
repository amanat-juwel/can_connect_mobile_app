import React from 'react';
import { View, Text, Button } from 'react-native';
import routes from '../Navigation/routes';

const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Welcome Screen"
        onPress={() => navigation.navigate(routes.WELCOME_SCREEN)}
      />
    </View>
  );
};

export default ProfileScreen;
