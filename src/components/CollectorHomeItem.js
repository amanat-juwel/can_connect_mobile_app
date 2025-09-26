import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utility/date.helper';

const CollectorHomeItem = ({ id, items, date, address, onPress, status }) => {
  const { t } = useTranslation();

  const getTitle = () => {
    return items?.map((item) => item.type).join(', ');
  };

  const getStatusColor = (status) => {
    const colorMap = {
      pending: colors.orange,
      accepted: colors.primary,
      cancelled: colors.red,
      completed: colors.darkGreen,
    };
    return colorMap[status] || colors.medium;
  };

  const getStatusText = (status) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.cardHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobId}>Job #{id}</Text>
          <View style={[styles.statusChip, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.statusText}>{getStatusText(status)}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.itemRow}>
          <View style={styles.itemIcon}>
            <MaterialCommunityIcons
              name="recycle-variant"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={styles.itemText} numberOfLines={2}>
            {getTitle()}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialIcons name="calendar-today" size={16} color={colors.medium} />
            <Text style={styles.infoText}>{formatDate(date)}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="location-pin" size={16} color={colors.medium} />
            <Text style={styles.infoText} numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginRight: 12,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    textTransform: 'capitalize',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 167, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 8,
    flex: 1,
  },
});

export default CollectorHomeItem;
