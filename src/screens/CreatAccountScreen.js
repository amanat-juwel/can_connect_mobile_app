import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import CustomInputTextField from '../components/CustomInputTextField';
import CustomButton from '../components/CustomButton';
import CustomInputPasswordField from '../components/CustomInputPasswordField';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import CustomCheckBox from '../components/CustomCheckBox'; // Import your CheckBox component
import { useNavigation } from '@react-navigation/native';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isCollector, setIsCollector] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const { width, height } = Dimensions.get('window');
  const imageWidth = width * 0.38 * 0.8;
  const imageHeight = imageWidth * (138 / 184);
  const navigation = useNavigation();

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const states = ['New York', 'California', 'Texas', 'Florida', 'Illinois'];

  const handleSignUp = () => {
    // Implement signup logic here
  };
  const handlePress = () => {
    // Open the link in the browser
    Linking.openURL('https://www.google.com/');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{ width: imageWidth, height: imageHeight }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>Create account</Text>
        </View>
        <View style={styles.formContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: (width-50)/2,
              
            }}
          >
            <CustomInputTextField
              placeholder="First Name"
              onChangeText={setFirstName}
              style={{  flex: 1}} // Set width to 100%
            />
            <View style={{ marginRight: 10 }}/>
            <CustomInputTextField
              placeholder="Last Name"
              onChangeText={setLastName}
              style={{ flex:1}} // Set width to 100%
            />
          </View>

          <CustomInputTextField placeholder="Email" onChangeText={setEmail} />

          <CustomInputTextField
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
          />

          <CustomInputPasswordField
            placeholder="Password"
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <CustomInputPasswordField
            placeholder="Confirm Password"
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          {/* City Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
              style={[styles.picker, { borderColor: '#00A75A' }]} // Green border color
            >
              <Picker.Item label="Select City" value="" color="gray" />
              {cities.map((city, index) => (
                <Picker.Item label={city} value={city} key={index} />
              ))}
            </Picker>
          </View>

          {/* State Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue, itemIndex) => setState(itemValue)}
              style={[styles.picker, { borderColor: '#00A75A' }]} // Green border color
            >
              <Picker.Item label="Select State" value="" color="gray" />
              {states.map((state, index) => (
                <Picker.Item label={state} value={state} key={index} />
              ))}
            </Picker>
          </View>

          {/* Checkboxes */}
          <View style={styles.checkboxContainer}>
            <CustomCheckBox
              title="Collector"
              checked={isCollector}
              onPress={() => setIsCollector(!isCollector)}
              checkedColor="#00A75A"
            />
            <CustomCheckBox
              title="User (For Recycle)"
              checked={isUser}
              onPress={() => setIsUser(!isUser)}
              checkedColor="#00A75A"
            />
          </View>
        </View>

        <CustomButton label="Create account" onPress={handleSignUp} />
        <Text style={[styles.termsContainer, { fontSize: 16 }]}>
          By signing up you agree to all the{' '}
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.terms}>Terms & Conditions</Text>
          </TouchableOpacity>
        </Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.logInContainer}>
            Already have an account? {''}  {/* Add space after "?" */}
            <Text
              style={styles.logInText}
              onPress={() => navigation.navigate('LoginScreen')}
            >
               Log In
            </Text>
          </Text>
        </View>
      </View>
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
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
  },
  textContainer: {
    alignSelf: 'flex-start', // Align the text to the left
    marginBottom: 20,
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  nameInput: {
    //flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#00A75A',
    borderRadius: 10,
    marginBottom: 15,
    height: 60,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkboxContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  termsContainer: {
    marginTop: 10,
    marginBottom: 40,
    flexDirection: 'row',
  },
  terms: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  logInContainer: {
    fontSize: 16,
  },
  logInText: {
    fontWeight: 'bold',
    color: '#00A75A',
  },
  bottomContainer: {
    marginBottom: 40,
  },
});

export default CreateAccount;
