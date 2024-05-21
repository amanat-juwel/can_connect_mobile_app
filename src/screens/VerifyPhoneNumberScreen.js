// VerifyPhoneNumberScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInputTextField from '../components/CustomInputTextField'; // Ensure the path is correct
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const VerifyPhoneNumberScreen = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+61');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const countryCodes = [
    { label: 'Australia (+61)', value: '+61', flag: '🇦🇺' },
    { label: 'USA (+1)', value: '+1', flag: '🇺🇸' },
    { label: 'UK (+44)', value: '+44', flag: '🇬🇧' },
    { label: 'Bangladesh (+88)', value: '+88', flag: '🇧🇩' }, // Add more country codes as needed
  ];

  const handleSubmit = () => {
    console.log('Phone Number Submitted:', selectedCountryCode + phoneNumber);
    // If Successful Log In
    navigation.navigate('OtpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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
        <TextInput
          style={styles.textInput}
          placeholder="+61 345 2536"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
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
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00A75A',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
  },
  picker: {
    width: 115,
    height: 50,
  },
  pickerItem: {
    fontSize: 25,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default VerifyPhoneNumberScreen;
