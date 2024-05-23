import React from 'react';
import { View, Text, Button } from 'react-native';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await authApi.logout();
    logout();
  };
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
