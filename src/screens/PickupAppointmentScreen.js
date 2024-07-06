import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import SuccessImage from '../components/SuccessImage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import routes from '../Navigation/routes';
import colors from '../constants/colors';

const PickupAppointmentScreen = ({}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: routes.HOME_SCREEN }],
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <SuccessImage
          source={require('../../assets/images/CheckMarks-Pickup Appointment.png')}
          width={180}
          height={180}
        />
        <Text style={styles.textHeader}>
          {t('pickupAppointmentCreateConfirmation')}
        </Text>
        <Text style={styles.primaryDescription}>{t('PrimaryDescription')}</Text>
        <Text style={styles.secondaryDescription}>
          {t('SecondaryDescription')}
        </Text>
      </View>

      <View style={styles.bottomView}>
        <CustomButton
          label={t('pickupAppointmentButtonText')}
          onPress={navigateToHome}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  textHeader: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 10,
  },
  primaryDescription: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.black,
    marginTop: 30,
    marginHorizontal: 10,
  },
  secondaryDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.grey,
    marginTop: 40,
    marginHorizontal: 20,
  },
  bottomView: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default PickupAppointmentScreen;
