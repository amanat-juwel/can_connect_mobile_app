import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const DashboardItem = ({ icon = 'list', label, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconValueContainer}>
        <MaterialIcons name={icon} size={30} color={colors.primary} />
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 120,
  },
  iconValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  labelContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
  },
  value: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default DashboardItem;
