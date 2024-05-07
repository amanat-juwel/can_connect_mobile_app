// CreatAccountScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreatAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the CreatAccountScreen!</Text>
      {/* Add your UI components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatAccountScreen;
