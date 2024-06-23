import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import NotificationComponent from '../components/NotificationComponent';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);

  const { t } = useTranslation();

  const getNotifications = async () => {
    const result = await commonApi.getNotifications();
    if (result.ok && result.data.success) {
      setNotifications(result.data.data);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        {notifications.length === 0 && (
          <View style={styles.textContainer}>
            <Text style={styles.headingLabel}>{t('noNotificationsText')}</Text>
          </View>
        )}
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationComponent
              text={item.text}
              date={item.readable_created_time}
            />
          )}
        />
      </View>
    </View>
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
  textContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  headingLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
});

export default NotificationScreen;
