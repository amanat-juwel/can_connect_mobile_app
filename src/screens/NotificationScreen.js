import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import NotificationComponent from '../components/NotificationComponent';
import LoadingComponent from '../components/LoadingComponent';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();

  const getNotifications = async () => {
    setLoading(true);

    const result = await commonApi.getNotifications();
    setLoading(false);

    if (result.ok && result.data.success) {
      setNotifications(result.data.data);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <TouchableWithoutFeedback>
          <LoadingComponent />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.formContainer}>
        {notifications.length === 0 && !loading && (
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
