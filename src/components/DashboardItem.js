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
    paddingHorizontal: 18,
    paddingTop: 8,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    height: 110,
  },
  iconValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  labelContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 40,
    color: colors.primary,
  },
});

export default DashboardItem;
