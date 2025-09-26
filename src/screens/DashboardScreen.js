import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity,
  Dimensions,
  RefreshControl 
} from 'react-native';
import { useTranslation } from 'react-i18next';
import commonApi from '../api/common';
import DashboardItem from '../components/DashboardItem';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import useAuth from '../auth/useAuth';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [dashboard, setDashboard] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  const getDashboardData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    }
    const result = await commonApi.getDashboardData();
    if (result.ok && result.data.success) {
      delete result.data.data.type;
      setDashboard(result.data.data);
    }
    setRefreshing(false);
  };

  const onRefresh = () => {
    getDashboardData(true);
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

  const getTotalRequests = () => {
    return dashboard.total_request || 0;
  };

  const getCompletedRequests = () => {
    return dashboard.complete_count || 0;
  };

  const getPendingRequests = () => {
    return dashboard.pending_count || 0;
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>
              {t('Welcome back!')}
            </Text>
            <Text style={styles.userName}>
              {user?.first_name ? `${user.first_name} ${user.last_name}` : 'User'}
            </Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <MaterialIcons name="refresh" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        
        {/* Quick Stats */}
        <View style={styles.quickStatsContainer}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{getTotalRequests()}</Text>
            <Text style={styles.quickStatLabel}>Total Requests</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{getCompletedRequests()}</Text>
            <Text style={styles.quickStatLabel}>Completed</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{getPendingRequests()}</Text>
            <Text style={styles.quickStatLabel}>Pending</Text>
          </View>
        </View>
      </View>

      {/* Dashboard Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Dashboard Cards */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>
            {t('dashboardText') || 'Dashboard Overview'}
          </Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Section
  headerSection: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Quick Stats
  quickStatsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
  },
  quickStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  // Cards Section
  cardsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    marginBottom: 16,
  },
  
  // Quick Actions
  quickActionsSection: {
    marginTop: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
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
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default DashboardScreen;
