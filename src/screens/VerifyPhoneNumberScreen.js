import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton'; // Ensure the path is correct
import CustomInputTextField from '../components/CustomInputTextField'; // Import the new CustomInputTextField
import { Picker } from '@react-native-picker/picker';

const VerifyPhoneNumber = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+61');
  const [countryCode, setCountryCode] = useState('+61');
  const [phoneNumber, setPhoneNumber] = useState('');

  const countryCodes = [
    { label: 'Australia (+61)', value: '+61', flag: '🇦🇺' },
    { label: 'USA (+1)', value: '+1', flag: '🇺🇸' },
    { label: 'UK (+44)', value: '+44', flag: '🇬🇧' },
    { label: 'India (+91)', value: '+91', flag: '🇮🇳' },

    // Add more country codes as needed
  ];

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Phone Number Submitted:', selectedCountryCode + phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCountryCode}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCountryCode(itemValue)}
      >
        {countryCodes.map((code) => (
          <Picker.Item
            key={code.value}
            label={`${code.flag}`}
            value={code.value}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
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
        <CustomButton label="Continue" onPress={handleSubmit} />
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
  picker: {
    width: 118,
    height: 50,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  pickerItem: {
    fontSize: 30,
  },
});

export default VerifyPhoneNumber;