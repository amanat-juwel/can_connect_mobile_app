import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton'; // Ensure the path is correct
import CustomInputTextField from '../components/CustomInputTextField'; // Import the new CustomInputTextField

const VerifyPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Phone Number Submitted:', phoneNumber);
  };

  return (
    <View style={styles.container}>
      <CustomInputTextField
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text style={styles.infoText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton 
          label="Continue" 
          onPress={handleSubmit} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default VerifyPhoneNumber;
