import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, Dimensions  } from 'react-native';
import CustomInputTextField from '../components/CustomInputTextField';
import CustomButton from '../components/CustomButton';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
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

      <Text style={styles.headingLabel}>Create account</Text>
      <View style={styles.formContainer}>
      
        <CustomInputTextField
          placeholder="Enter your first name"
          onChangeText={setFirstName}
        />
        
        <CustomInputTextField
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
        
        <CustomInputTextField
          placeholder="Enter your phone number"
          onChangeText={setPhoneNumber}
        />
        
        <CustomInputTextField
          placeholder="Enter your password"
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        
        <CustomInputTextField
          placeholder="Confirm your password"
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
    paddingHorizontal: 30,
  },
  headingLabel: {
    fontSize: 25,
    textAlign: 'left', // Align text to the left
    marginBottom: 20,
    fontWeight: '500',
    marginTop: 10,
    //alignItems: 'left' // Add some bottom margin for spacing
  },
  formContainer: {
    width: '100%', // Take up full width
  },
  label: {
    marginBottom: 5,
    textAlign: 'center', // Align text to the center
  },
});

export default CreateAccount;
