import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../auth/useAuth';
import userType from '../constants/userType';
import requestorApi from '../api/requestor';
import collectorApi from '../api/Collector';
import { Icon } from 'react-native-elements';
import routes from '../Navigation/routes';

const HistoryDetailsScreen = ({ route, navigation }) => {
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

  const cancelRequest = async () => {
    const result = await requestorApi.cancelRequest({
      sku: request.sku,
      status: 'cancelled',
    });
    if (result.ok && result.data.success) {
      navigation.navigate({
        name: routes.HISTORY_SCREEN,
        key: `${routes.HISTORY_SCREEN}-${Date.now()}`,
      });
    }
  };

  const completeRequest = async () => {
    const result = await collectorApi.completeRequest({
      sku: request.sku,
      status: 'completed',
    });
    if (result.ok && result.data.success) {
      navigation.navigate({
        name: routes.HISTORY_SCREEN,
        key: `${routes.HISTORY_SCREEN}-${Date.now()}`,
        params: { showToast: true },
      });
    }
  };

  useEffect(() => {
    if (user && user?.category === userType.REQUESTOR) {
      getRequestTrailData({ sku: request.sku });
    }
  }, []);

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
          <Text style={styles.headingLabel}>{t('ItemListText')}</Text>
        </View>
        <View style={styles.leftAlignedContainer}>
          {request.items.map((item) => (
            <View key={item.item_id} style={styles.row}>
              <MaterialCommunityIcons
                name="recycle-variant"
                size={18}
                color={colors.primary}
              />
              <Text
                style={styles.text}
              >{`${item.qty} ${item.unit} of ${item.type}`}</Text>
            </View>
          ))}
          {request.is_donation === 1 && (
            <View style={[styles.row, { marginTop: 10 }]}>
              <MaterialIcons
                name="volunteer-activism"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.text}>{t('DonationText')}</Text>
            </View>
          )}
          {request.note?.length > 0 && (
            <View style={[styles.row, { marginTop: 10 }]}>
              <MaterialIcons name="note" size={18} color={colors.primary} />
              <Text style={styles.text}>{request.note}</Text>
            </View>
          )}
        </View>
        {requestTrail && requestTrail.length > 0 && (
          <View style={styles.textContainer}>
            <Text style={styles.headingLabel}>{t('TrackText')}</Text>
          </View>
        )}
        {requestTrail && requestTrail.length > 0 && (
          <View style={styles.leftAlignedContainer}>
            {requestTrail.map((item) => (
              <View key={item.created_at} style={styles.trackRow}>
                <View style={styles.tractIcon}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={18}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.trackTextContainer}>
                  <Text style={styles.text}>{item.readable_created_time}</Text>
                  <Text style={styles.text}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.headingLabel}>{t('ContactDetailsText')}</Text>
        </View>
        <View style={styles.leftAlignedContainer}>
          <View style={styles.row}>
            <MaterialIcons
              name="account-circle"
              size={18}
              color={colors.black}
            />
            <Text
              style={styles.text}
            >{`${request.requestor.first_name} ${request.requestor.last_name}`}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="phone" size={18} color={colors.black} />
            <Text style={styles.text}>{`${request.requestor.phone}`}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="email" size={18} color={colors.black} />
            <Text style={styles.text}>{`${request.requestor.email}`}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="location-pin" size={18} color={colors.black} />
            <Text
              style={styles.text}
            >{`${request.street_address}, ${request.postal_code}`}</Text>
          </View>
        </View>
      </View>

      {user && user?.category === userType.REQUESTOR ? (
        <View style={styles.bottomView}>
          <CustomButton
            label={t('CancelRequestText')}
            color={colors.red}
            onPress={cancelRequest}
            disabled={request.status === 'cancelled'}
          />
        </View>
      ) : (
        <View style={styles.bottomView}>
          <CustomButton
            label={t('CompleteRequestText')}
            onPress={completeRequest}
            disabled={request.status === 'completed'}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.primary,
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
    alignItems: 'center',
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
    fontSize: 22,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    marginStart: 8,
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  leftAlignedContainer: {
    alignSelf: 'flex-start',
  },
  trackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tractIcon: {
    alignItems: 'center',
  },
  trackTextContainer: {
    marginStart: 8,
    flexDirection: 'column',
  },
});

export default HistoryDetailsScreen;
