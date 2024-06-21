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

const validationSchema = Yup.object().shape({
  dob: Yup.string().required(),
  parent_email: Yup.string().email().required(),
  parent_mobile_no: Yup.string()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .required(),
});

const initialFormValues = {
  dob: '',
  parent_email: '',
  parent_mobile_no: '',
};

const CollectorQuestionnaire = ({ route }) => {
  const { t } = useTranslation();
  const [questionnaire, setQuestionnaire] = useState([]);
  const [answerSet, setAnswerSet] = useState([]);
  const [registrationFailed, setRegistrationFailed] = useState();
  const [isEligible, setIsEligible] = useState(true);
  const [isMinor, setIsMinor] = useState(false);

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

  const handleSignUp = async (data) => {
    console.log(data);
  };

  const handleAnswer = (id, newAnswer) => {
    setQuestionnaire((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, answer: newAnswer } : question,
      ),
    );
  };

  // console.log('questionnaire', questionnaire);
  // console.log('answerSet', answerSet);
  const filteredQuestions = questionnaire.filter(
    (question) => Boolean(question.is_minor_question) === isMinor,
  );
  console.log('filteredQuestions', filteredQuestions);
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
            <CustomFormField
              name="dob"
              placeholder={t('emailText')}
              errorMessage={t('emailErrorMessage')}
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
                  <Text style={styles.question}>{question.question_text}</Text>
                  {answerSet.map((answer) => (
                    <View key={answer} style={styles.answerCheckbox}>
                      <CustomCheckBox
                        title={answer}
                        isChecked={
                          questionnaire.find((item) => item.id === question.id)
                            .answer === answer
                        }
                        onPress={() => handleAnswer(question.id, answer)}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <CustomErrorMessage
              error={t('registrationFailedMessage')}
              visible={registrationFailed}
            />
            <CustomSubmitButton label={t('createAccountButtonText')} />
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
  logInText: {
    fontWeight: 'bold',
    color: '#00A75A',
  },
});

export default CollectorQuestionnaire;
