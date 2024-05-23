import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

const OfflineNotice = (_props) => {
  const { t } = useTranslation();
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{t('noInternetMessage')}</Text>
      </View>
    );

  return null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    height: 50,
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    top: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default OfflineNotice;
