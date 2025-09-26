import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from '../components/CustomLinkButton';
import routes from '../Navigation/routes';
import {
  CustomForm,
  CustomFormField,
  CustomSubmitButton,
  CustomErrorMessage,
} from '../components/forms';
import * as Yup from 'yup';
import { emailOrPhoneSchema, isEmail } from '../utility/validation.helper';
import authApi from '../api/auth';
import colors from '../constants/colors';
import LoadingComponent from '../components/LoadingComponent';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  id: emailOrPhoneSchema,
});

const VerifyPhoneNumberScreen = () => {
  const [otpRequestFailed, setOtpRequestFailed] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleSubmit = async ({ id }) => {
    setLoading(true);
    const result = isEmail(id)
      ? await authApi.requestOtp('', id)
      : await authApi.requestOtp(id);
    setLoading(false);
    if (!result.ok || !result.data.success) {
      setOtpRequestFailed(true);
      setErrorMessage(result.data.errorMessage[0]);
      return;
    }
    setOtpRequestFailed(false);
    navigation.navigate(routes.OTP_SCREEN, { id });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
              name="shield-check" 
              size={60} 
              color={colors.primary} 
            />
          </View>
          <Text style={styles.title}>
            {t('Verify Your Email Address')}
          </Text>
          <Text style={styles.subtitle}>
            {t('Enter your email address to receive a verification code')}
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <CustomForm
            initialValues={{ id: '' }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <MaterialIcons 
                    name="phone" 
                    size={20} 
                    color={colors.medium} 
                  />
                </View>
                <CustomFormField
                  name="id"
                  placeholder={t('emailPhonePlaceHolder') || 'Phone number or email'}
                  errorMessage={t('idErrorMessage')}
                  style={styles.inputField}
                />
              </View>

              <CustomErrorMessage
                error={errorMessage}
                visible={otpRequestFailed}
                style={styles.errorMessage}
              />

              <View style={styles.buttonContainer}>
                <CustomSubmitButton 
                  label={t('continueText') || 'Continue'} 
                  style={styles.submitButton}
                />
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.linkButtonContainer}>
                <CustomLinkButton
                  text={t('loginUsingPasswordMessage') || 'Login with Password'}
                  onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
                  LinkColor={colors.primary}
                  fontSize={16}
                  fontWeight="600"
                  icon="lock"
                  iconPosition="left"
                  showUnderline={false}
                  padding={16}
                  backgroundColor="transparent"
                  borderWidth={1}
                  borderColor={colors.primary}
                  borderRadius={12}
                />
              </View>
            </View>
          </CustomForm>
        </View>

        {/* Footer Section */}
        {/* <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            {t('verifyPhoneFooter') || 'We\'ll send you a verification code to confirm your identity'}
          </Text>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  
  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 0,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 167, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.medium,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  
  // Form Section
  formSection: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 16,
  },
  inputIcon: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputField: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: colors.black,
  },
  errorMessage: {
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  dividerText: {
    fontSize: 14,
    color: colors.medium,
    paddingHorizontal: 16,
  },
  
  // Link Button
  linkButtonContainer: {
    alignItems: 'center',
  },
  linkButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  
  // Footer Section
  footerSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: colors.medium,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default VerifyPhoneNumberScreen;
