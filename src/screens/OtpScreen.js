// OtpScreen.js

import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';

const OtpScreen = () => {
  const [otpCode1, setOtpCode1] = useState('');
  const [otpCode2, setOtpCode2] = useState('');
  const [otpCode3, setOtpCode3] = useState('');
  const [otpCode4, setOtpCode4] = useState('');

  const otpInput1 = useRef(null);
  const otpInput2 = useRef(null);
  const otpInput3 = useRef(null);
  const otpInput4 = useRef(null);

  const handleSubmit = () => {
    const otpCode = `${otpCode1}${otpCode2}${otpCode3}${otpCode4}`;
    console.log('OTP Code Submitted:', otpCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={otpInput1}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode1}
          onChangeText={(text) => {
            setOtpCode1(text);
            if (text) otpInput2.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput2}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode2}
          onChangeText={(text) => {
            setOtpCode2(text);
            if (text) otpInput3.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput3}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode3}
          onChangeText={(text) => {
            setOtpCode3(text);
            if (text) otpInput4.current.focus();
          }}
          maxLength={1}
        />
        <TextInput
          ref={otpInput4}
          style={styles.textInput}
          placeholder="-"
          keyboardType="phone-pad"
          value={otpCode4}
          onChangeText={setOtpCode4}
          maxLength={1}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="Verify" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginVertical: 5,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  textInput: {
    width: '15%',
    height: 60,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00A75A',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default OtpScreen;
