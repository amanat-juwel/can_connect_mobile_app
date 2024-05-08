import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, Dimensions } from 'react-native';
import CustomInputTextField from '../components/CustomInputTextField';
import CustomButton from '../components/CustomButton';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const { width, height } = Dimensions.get('window');
  const imageWidth = width * 0.38 * 0.8;
  const imageHeight = imageWidth * (138 / 184);

  const handleSignUp = () => {
    // Implement signup logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('../../assets/images/icon.png')}
        style={[{ width: imageWidth, height: imageHeight }]}
      />

      <Text style={[styles.headingLabel]}>Create account</Text>
      <View style={styles.formContainer}>
        <View style={styles.nameContainer}>
          <CustomInputTextField
            placeholder="First Name"
            onChangeText={setFirstName}
            style={[styles.nameInput]} // Added marginRight for space
          />
          <View style={{ width: 20 }}></View>
          <CustomInputTextField
            placeholder="Last Name"
            onChangeText={setLastName}
            style={styles.nameInput}
          />
        </View>

        <CustomInputTextField
          placeholder="Email"
          onChangeText={setEmail}
        />

        <CustomInputTextField
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
        />

        <CustomInputTextField
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <CustomInputTextField
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <CustomInputTextField
          placeholder="Select your city"
          onChangeText={setCity}
        />

        <CustomInputTextField
          placeholder="Select your state"
          onChangeText={setState}
        />
      </View>

      <CustomButton level="Create account " onPress={handleSignUp} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headingLabel: {
    fontSize: 25,
    textAlign: 'left',
    marginBottom: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  nameInput: {
    //width: '48%',
    flex: 1
  },
});

export default CreateAccount;
