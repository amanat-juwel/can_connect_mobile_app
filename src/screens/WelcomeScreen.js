import React from "react";
import {View, Text, StyleSheet} from "react-native"

const WelcomeScreen = () => {
    return(
        <View style={styles.container}>
      <Text style={styles.text}>Welcome Screen</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;