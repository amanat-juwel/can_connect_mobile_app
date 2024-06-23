import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationComponent = ({ text, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="notifications" size={22} color={colors.primary} />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={styles.label}>{text}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
  },
  label: {
    paddingStart: 8,
    paddingEnd: 20,
    fontSize: 16,
  },
  date: {
    paddingStart: 8,
    paddingEnd: 20,
    fontSize: 12,
    color: colors.grey,
  },
  iconContainer: {
    marginRight: 10,
  },
  notificationContainer: {
    flexDirection: 'column',
  },
});

export default NotificationComponent;
