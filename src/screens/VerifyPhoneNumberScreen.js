import React from "react";
import { View, Text, StyleSheet } from "react-native";

const VerifyPhoneNumber = () => {
  return (
    <View style={styles.container}>
      <Text> This is Phone Numer Input Screen.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default VerifyPhoneNumber;