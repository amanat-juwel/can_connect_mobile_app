import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import routes from '../Navigation/routes';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import HistoryItem from '../components/HistoryItem';
import CustomButton from '../components/CustomButton';
import FilterComponent from '../components/FilterComponent';
import ToastManager, { Toast } from 'toastify-react-native';
import LoadingComponent from '../components/LoadingComponent';
import { MaterialIcons } from '@expo/vector-icons';

const limit = 5;
const { width } = Dimensions.get('window');

const HistoryScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([]);
  const [meta, setMeta] = useState({});
  const [payload, setPayload] = useState({
    offset: 0,
    self_only: true,
    limit: limit,
    sort_by: 'id',
    order_by: 'DESC',
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { t } = useTranslation();

  const getHistory = async (payload, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    const result = await commonApi.getHistory(payload);
    setLoading(false);
    setRefreshing(false);
    if (result.ok && result.data.success) {
      setHistory(result.data.data.result);
      setMeta(result.data.data.meta);
    }
  };

  const onRefresh = () => {
    const refreshPayload = { ...payload, offset: 0 };
    setPayload(refreshPayload);
    getHistory(refreshPayload, true);
  };

  useEffect(() => {
    getHistory(payload);
  }, []);

  const handleNext = () => {
    if (meta?.has_more !== 1) {
      return;
    }
    setPayload((prev) => {
      const newPayload = { ...prev, offset: prev.offset + limit };
      getHistory(newPayload);
      return newPayload;
    });
  };

  const handlePrev = () => {
    if (meta?.offset === 0) {
      return;
    }
    setPayload((prev) => {
      const newPayload = {
        ...prev,
        offset: Math.max(prev.offset - limit, 0),
      };
      getHistory(newPayload);
      return newPayload;
    });
  };

  const applyFilter = (filterPayload) => {
    const { state, city, status, ...otherProps } = filterPayload;
    setPayload((prev) => {
      const newPayload = {
        ...prev,
        ...otherProps,
        offset: 0,
        state_id: state?.id || '',
        city_id: city?.id || '',
        status: status?.name.toLowerCase() || '',
      };

      getHistory(newPayload);

      return newPayload;
    });
  };

  const showDetails = (id) => {
    const request = history.find((item) => item.sku === id);
    navigation.navigate(routes.HISTORY_DETAILS_SCREEN, { request: request });
  };

  useEffect(() => {
    const { showToast } = route.params || {};
    if (showToast) {
      Toast.success(t('completeRequestSuccessText'));
    }
  }, []);

  const getStatusCounts = () => {
    const counts = history.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        {/* <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Request History</Text>
            <Text style={styles.headerSubtitle}>
              {history.length} {history.length === 1 ? 'request' : 'requests'} found
            </Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <MaterialIcons 
              name="filter-list" 
              size={24} 
              color={showFilters ? colors.white : colors.primary} 
            />
          </TouchableOpacity>
        </View> */}

        {/* Status Stats */}
        {history.length > 0 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsContainer}
          >
            {Object.entries(statusCounts).map(([status, count]) => (
              <View key={status} style={styles.statItem}>
                <Text style={styles.statCount}>{count}</Text>
                <Text style={styles.statLabel}>{status}</Text>
              </View>
            ))}
            <TouchableOpacity 
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <MaterialIcons 
              name="filter-list" 
              size={24} 
              color={showFilters ? colors.white : colors.primary} 
            />
          </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* Filter Section */}
      {showFilters && (
        <View style={styles.filterSection}>
          <FilterComponent applyFilter={applyFilter} />
        </View>
      )}

      {/* Content Section */}
      <View style={styles.contentSection}>
        <ToastManager />
        {loading ? (
          <View style={styles.loadingContainer}>
            <LoadingComponent />
          </View>
        ) : history.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="history" size={80} color={colors.medium} />
            <Text style={styles.emptyStateTitle}>No History Found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Your request history will appear here once you make your first request.
            </Text>
            <TouchableOpacity 
              style={styles.createRequestButton}
              onPress={() => navigation.navigate(routes.RECYCLE_SCREEN)}
            >
              <MaterialIcons name="add" size={20} color={colors.white} />
              <Text style={styles.createRequestText}>Create Request</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HistoryItem
                id={item.sku}
                date={`${item.preferred_pick_date} ${item.preferred_pick_time}`}
                address={`${item.street_address}, ${item.postal_code}`}
                status={item.status}
                onPress={showDetails}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[colors.primary]}
                tintColor={colors.primary}
              />
            }
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Pagination Section */}
      {history.length !== 0 && !loading && (
        <View style={styles.paginationSection}>
          <View style={styles.paginationInfo}>
            <Text style={styles.paginationText}>
              Page {Math.floor(meta?.offset / limit) + 1} of {Math.ceil(meta?.total / limit) || 1}
            </Text>
          </View>
          <View style={styles.paginationButtons}>
            <TouchableOpacity
              style={[
                styles.paginationButton,
                meta?.offset === 0 && styles.paginationButtonDisabled
              ]}
              onPress={handlePrev}
              disabled={meta?.offset === 0}
            >
              <MaterialIcons 
                name="chevron-left" 
                size={20} 
                color={meta?.offset === 0 ? colors.medium : colors.primary} 
              />
              <Text style={[
                styles.paginationButtonText,
                meta?.offset === 0 && styles.paginationButtonTextDisabled
              ]}>
                Previous
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paginationButton,
                meta?.has_more !== 1 && styles.paginationButtonDisabled
              ]}
              onPress={handleNext}
              disabled={meta?.has_more !== 1}
            >
              <Text style={[
                styles.paginationButtonText,
                meta?.has_more !== 1 && styles.paginationButtonTextDisabled
              ]}>
                Next
              </Text>
              <MaterialIcons 
                name="chevron-right" 
                size={20} 
                color={meta?.has_more !== 1 ? colors.medium : colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Header Section
  headerSection: {
    backgroundColor: colors.primary,
    paddingTop: 5,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  // Stats Section
  statsContainer: {
    marginTop: 6,
  },
  statItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 70,
  },
  statCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'capitalize',
  },
  
  // Filter Section
  filterSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  // Content Section
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingVertical: 12,
  },
  
  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: colors.medium,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  createRequestButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createRequestText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  // Pagination Section
  paginationSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  paginationInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  paginationText: {
    fontSize: 14,
    color: colors.medium,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 100,
    justifyContent: 'center',
  },
  paginationButtonDisabled: {
    borderColor: colors.medium,
    backgroundColor: '#f8f9fa',
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: 4,
  },
  paginationButtonTextDisabled: {
    color: colors.medium,
  },
});

export default HistoryScreen;
