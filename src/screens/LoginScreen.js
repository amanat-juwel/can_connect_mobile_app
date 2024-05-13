import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomCheckBox from '../components/CustomCheckBox'; // Import your CheckBox component
import CustomButton from '../components/CustomButton';
import CustomInputTextField from '../components/CustomInputTextField';

const LoginScreen = () => {
  const { width } = Dimensions.get('window');
  const LOGO_WIDTH_RATIO = 0.38;
  const LOGO_HEIGHT_RATIO = 138 / 184;

  const logoWidth = width * LOGO_WIDTH_RATIO * 0.8;
  const logoHeight = logoWidth * LOGO_HEIGHT_RATIO;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{ width: logoWidth, height: logoHeight }}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            // Add onChangeText handler here
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={[styles.input, styles.passwordInput]}
            // Add onChangeText handler here
          />
          <View style={styles.rememberContainer}>
            <CustomCheckBox title="Remember me" checked={false} onPress={() => {}} />
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgetPassword}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
          <CustomButton level="Log In" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text>This is Bottom Container.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    flexGrow: 1,
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Take remaining space
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00A75A',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
  },
  passwordInput: {
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  forgetPassword: {
    color: '#00A75A',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center'
  },
});

export default LoginScreen;
