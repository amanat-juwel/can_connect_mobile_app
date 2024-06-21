import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import routes from '../Navigation/routes';
import CanConnectLogo from '../components/CanConnectLogo';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';
import publicApi from '../api/public';
import {
  CustomErrorMessage,
  CustomForm,
  CustomFormField,
  CustomSubmitButton,
} from '../components/forms';
import * as Yup from 'yup';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomFormDatePicker from '../components/forms/CustomFormDatePicker';
import { isAdult } from '../utility/date.helper';
import registrationApi from '../api/registration';
import authApi from '../api/auth';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  dob: Yup.string().required(),
  parent_email: Yup.string()
    .email()
    .when('dob', {
      is: (value) => !isAdult(value),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema,
    }),
  parent_mobile_no: Yup.string().when('dob', {
    is: (value) => !isAdult(value),
    then: (schema) => schema.matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/).required(),
    otherwise: (schema) => schema,
  }),
});

const initialFormValues = {
  dob: '',
  parent_email: '',
  parent_mobile_no: '',
};

const CollectorQuestionnaire = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [questionnaire, setQuestionnaire] = useState([]);
  const [answerSet, setAnswerSet] = useState([]);
  const [registrationFailed, setRegistrationFailed] = useState();
  const [isEligible, setIsEligible] = useState(true);
  const [isMinor, setIsMinor] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const getQuestionnaire = async () => {
    const result = await publicApi.getQuestionnaire();
    if (result.ok && result.data.success) {
      const questions = result.data.data.questions.map((item) => {
        return { ...item, answer: item.default_answer };
      });
      setQuestionnaire(questions);
      setAnswerSet(result.data.data.answer_sets);
    }
  };

  useEffect(() => {
    getQuestionnaire();
  }, []);

  const filteredQuestions = questionnaire.filter(
    (question) => Boolean(question.is_minor_question) === isMinor,
  );

  const handleSignUp = async (data) => {
    let payload = { ...route.params?.payload, ...data };
    payload.question_answers = filteredQuestions.map((question) => {
      return {
        question_id: question.id,
        answer: question.answer,
      };
    });
    payload.work_egilibity = isEligible;
    payload.is_minor = isMinor;
    await registerCollector(payload);
  };

  const registerCollector = async (payload) => {
    const result = await registrationApi.registerUser(payload);
    if (!result.ok || !result.data.success) return setRegistrationFailed(true);
    setRegistrationFailed(false);
    const requestOtpResult = await authApi.requestOtp(
      payload.phone,
      payload.email,
    );
    if (!requestOtpResult.ok || !requestOtpResult.data.success)
      return setRegistrationFailed(true);
    setRegistrationFailed(false);
    navigation.navigate(routes.OTP_SCREEN, { id: payload.phone });
  };

  const handleAnswer = (id, newAnswer) => {
    setQuestionnaire((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer: newAnswer } : question,
      ),
    );
  };

  const handleDobChange = (dob) => {
    setIsMinor(!isAdult(dob));
    setShowQuestionnaire(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CanConnectLogo />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>{t('collectorDetails')}</Text>
        </View>
        <View style={styles.formContainer}>
          <CustomForm
            initialValues={initialFormValues}
            onSubmit={handleSignUp}
            validationSchema={validationSchema}
          >
            <CustomFormDatePicker
              name="dob"
              label={t('dateOfBirthText')}
              errorMessage={t('dobErrorMessage')}
              onchange={(dob) => handleDobChange(dob)}
            />
            {isMinor && (
              <CustomFormField
                name="parent_email"
                placeholder={t('parentEmailText')}
                errorMessage={t('emailErrorMessage')}
              />
            )}
            {isMinor && (
              <CustomFormField
                name="parent_mobile_no"
                placeholder={t('parentPhoneText')}
                errorMessage={t('phoneErrorMessage')}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginBottom: 10,
              }}
            >
              <CustomCheckBox
                title={t('CollectorEligibilityText')}
                isChecked={isEligible}
                onPress={() => setIsEligible((prev) => !prev)}
              />
            </View>
            {showQuestionnaire && (
              <>
                <View style={styles.textContainer}>
                  <Text style={styles.headingLabel}>
                    {t('collectorQuestionnaire')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    marginBottom: 20,
                  }}
                >
                  {filteredQuestions.map((question) => (
                    <View key={question.id} style={styles.questionItem}>
                      <Text style={styles.question}>
                        {question.question_text}
                      </Text>
                      {answerSet.map((answer) => (
                        <View key={answer} style={styles.answerCheckbox}>
                          <CustomCheckBox
                            title={answer}
                            isChecked={
                              questionnaire.find(
                                (item) => item.id === question.id,
                              ).answer === answer
                            }
                            onPress={() => handleAnswer(question.id, answer)}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </>
            )}

            <CustomErrorMessage
              error={t('registrationFailedMessage')}
              visible={registrationFailed}
            />
            <View style={styles.submitButton}>
              <CustomSubmitButton label={t('createAccountButtonText')} />
            </View>
          </CustomForm>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  imageContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  questionItem: {
    marginBottom: 20,
  },
  answerCheckbox: {
    marginBottom: 5,
  },
  formContainer: {
    width: '100%',
  },
  submitButton: {
    marginBottom: 20,
  },
});

export default CollectorQuestionnaire;
