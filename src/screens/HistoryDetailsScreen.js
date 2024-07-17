import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import useAuth from '../auth/useAuth';
import userType from '../constants/userType';
import requestorApi from '../api/requestor';
import { Icon } from 'react-native-elements';

const HistoryDetailsScreen = ({ route }) => {
  const request = route.params?.request;
  const [requestTrail, setRequestTrail] = useState();
  const { t } = useTranslation();
  const { user } = useAuth();

  const getRequestTrailData = async (sku) => {
    const result = await requestorApi.getRequestTrail(sku);
    if (result.ok && result.data.success) {
      setRequestTrail(result.data.data.audit_trails);
    }
  };

  const getChipColor = () => {
    const colorMap = {
      pending: colors.orange,
      accepted: colors.primary,
      cancelled: colors.red,
      completed: colors.darkGreen,
    };
    return colorMap[request.status];
  };

  useEffect(() => {
    if (user && user?.category === userType.REQUESTOR) {
      getRequestTrailData({ sku: request.sku });
    }
  }, []);

  console.log(requestTrail);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text
          style={styles.textHeader}
        >{`${t('HistoryTitleText')} ${request.sku}`}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.chip, { backgroundColor: getChipColor() }]}>
            <Text style={styles.chipText}>{t(request.status)}</Text>
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.label}>Date</Text>
              <View style={styles.dateContent}>
                <Icon
                  name="calendar-blank-outline"
                  type="material-community"
                  size={20}
                  color="#5D5D5D"
                  style={styles.icon}
                />
                <Text style={styles.date}>
                  {route.params?.request.preferred_pick_date}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.label}>Time</Text>
              <View style={styles.dateContent}>
                <Icon
                  name="clock-outline"
                  type="material-community"
                  size={20}
                  color="#5D5D5D"
                  style={styles.icon}
                />
                <Text style={styles.date}>
                  {route.params?.request.preferred_pick_time}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>{t('ContactDetailsText')}</Text>
        </View>
        <View>
          <View style={styles.leftAlignedContainer}>
            <View style={styles.row}>
              <MaterialIcons
                name="calendar-today"
                size={16}
                color={colors.black}
              />
              <Text style={styles.text}>{request.requestor.first_name}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomView}>
        <CustomButton
          label={t('pickupAppointmentButtonText')}
          onPress={() => {}}
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
  },

  textHeader: {
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
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 20,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#00A75A',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5D5D5D',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'left',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: 90,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  headingLabel: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    marginStart: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  leftAlignedContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
  },
});

export default HistoryDetailsScreen;
