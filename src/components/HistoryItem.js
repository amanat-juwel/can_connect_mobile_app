import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utility/date.helper';

const HistoryItem = ({ id, date, address, status, onPress }) => {
  const { t } = useTranslation();

  const getChipColor = () => {
    const colorMap = {
      pending: colors.orange,
      accepted: colors.primary,
      cancelled: colors.red,
      completed: colors.darkGreen,
    };
    return colorMap[status];
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.historyContainer}>
        <View style={styles.row}>
          <MaterialIcons name="tag" size={16} color={colors.black} />
          <Text style={styles.label}>{`${id}`}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="calendar-today" size={12} color={colors.black} />
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="location-pin" size={12} color={colors.black} />
          <Text style={styles.date}>{address}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.chip, { backgroundColor: getChipColor() }]}>
          <Text style={styles.chipText}>{t(status)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    marginStart: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    marginStart: 8,
    fontSize: 12,
    color: colors.grey,
  },
  iconContainer: {
    marginRight: 10,
  },
  historyContainer: {
    flex: 1,
    paddingRight: 15,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HistoryItem;
