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
        <View style={styles.headerRow}>
          <View style={styles.idContainer}>
            <MaterialIcons name="tag" size={16} color={colors.primary} />
            <Text style={styles.label}>{`#${id}`}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: getChipColor() }]}>
            <Text style={styles.chipText}>{t(status)}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="calendar-today" size={16} color={colors.medium} />
          <Text style={styles.infoText}>{formatDate(date)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <MaterialIcons name="location-pin" size={16} color={colors.medium} />
          <Text style={styles.infoText} numberOfLines={2}>{address}</Text>
        </View>
      </View>
      
      <View style={styles.arrowContainer}>
        <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyContainer: {
    flex: 1,
    paddingRight: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.grey,
    flex: 1,
    lineHeight: 20,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  chipText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default HistoryItem;
