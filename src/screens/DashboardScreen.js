import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import commonApi from '../api/common';
import DashboardItem from '../components/DashboardItem';
import colors from '../constants/colors';

const DashboardScreen = () => {
  const [dashboard, setDashboard] = useState([]);
  const { t } = useTranslation();

  const getDashboardData = async () => {
    const result = await commonApi.getDashboardData();
    if (result.ok && result.data.success) {
      delete result.data.data.type;
      setDashboard(result.data.data);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  const getIcon = (label) => {
    const iconMap = {
      total_request: 'list',
      pending_count: 'schedule',
      accept_count: 'checklist',
      cancel_count: 'close',
      complete_count: 'check-circle-outline',
      todays_scheduled_pickup: 'calendar-today',
      this_weeks_scheduled_pickup: 'calendar-month',
      pending_notification: 'notifications-active',
    };
    return iconMap[label] || undefined;
  };

  const dashboardItems = Object.keys(dashboard).map((key) => {
    return { label: key, value: dashboard[key] };
  });

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {dashboardItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <DashboardItem
              label={t(item.label)}
              value={item.value}
              icon={getIcon(item.label)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '49%',
    marginBottom: 10,
  },
});

export default DashboardScreen;
