import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../utility/date.helper';

const CollectorHomeItem = ({ id, items, date, address, onPress }) => {
  const { t } = useTranslation();

  const getTitle = () => {
    return items?.map((item) => item.type).join(', ');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="recycle-variant"
          size={40}
          color={colors.primary}
        />
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>{`${getTitle()}`}</Text>
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
  itemContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  iconContainer: {
    justifyContent: 'start',
    alignItems: 'start',
  },
});

export default CollectorHomeItem;
