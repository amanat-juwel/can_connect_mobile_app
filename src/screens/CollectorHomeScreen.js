import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import routes from '../Navigation/routes';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import CustomButton from '../components/CustomButton';
import FilterComponent from '../components/FilterComponent';
import CollectorHomeItem from '../components/CollectorHomeItem';
import ToastManager, { Toast } from 'toastify-react-native';
import LoadingComponent from '../components/LoadingComponent';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../auth/useAuth';

const { width } = Dimensions.get('window');
const limit = 5;

const CollectorHomeScreen = ({ navigation, route }) => {
  const [requestList, setRequestList] = useState([]);
  const [meta, setMeta] = useState({});
  const [payload, setPayload] = useState({
    offset: 0,
    limit: limit,
    sort_by: 'id',
    order_by: 'DESC',
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  const getRequestList = async (payload, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    const result = await commonApi.getRequestList(payload);
    setLoading(false);
    setRefreshing(false);
    if (result.ok && result.data.success) {
      setRequestList(result.data.data.result);
      setMeta(result.data.data.meta);
    }
  };

  const onRefresh = () => {
    getRequestList(payload, true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getRequestList(payload);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (meta?.has_more !== 1) {
      return;
    }
    setPayload((prev) => {
      const newPayload = { ...prev, offset: prev.offset + limit };
      getRequestList(newPayload);
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
      getRequestList(newPayload);
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
      };

      getRequestList(newPayload);

      return newPayload;
    });
  };

  const showDetails = (id) => {
    const request = requestList.find((item) => item.sku === id);
    navigation.navigate(routes.REQUEST_DETAILS_SCREEN, { request: request });
  };

  useEffect(() => {
    const { showToast } = route.params || {};
    if (showToast) {
      Toast.success(t('acceptRequestSuccessText'));
    }
  }, []);

  const getTotalRequests = () => {
    return requestList.length;
  };

  const getPendingRequests = () => {
    return requestList.filter(item => item.status === 'pending').length;
  };

  const getAcceptedRequests = () => {
    return requestList.filter(item => item.status === 'accepted').length;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ToastManager />
      
      {/* Title and Filter Section */}
      <View style={styles.titleFilterSection}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>
            {t('activeJobsText') || 'Active Jobs'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {requestList.length} {requestList.length === 1 ? 'job' : 'jobs'} available
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, showFilters && styles.filterButtonActive]} 
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons 
            name="filter-list" 
            size={24} 
            color={showFilters ? colors.white : colors.primary} 
          />
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      {showFilters && (
        <View style={styles.filterSection}>
          <FilterComponent applyFilter={applyFilter} includeStatus={false} />
        </View>
      )}

      {/* Content Section */}
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

        {/* Jobs List */}
        {requestList.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="recycle-variant" 
              size={80} 
              color={colors.medium} 
            />
            <Text style={styles.emptyStateTitle}>
              {t('noRequestText') || 'No Jobs Available'}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              Check back later for new collection requests
            </Text>
            <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
              <MaterialIcons name="refresh" size={20} color={colors.white} />
              <Text style={styles.refreshButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.jobsList}>
            {requestList.map((item, index) => (
              <CollectorHomeItem
                key={item.id.toString()}
                id={item.sku}
                items={item.items}
                date={`${item.preferred_pick_date} ${item.preferred_pick_time}`}
                address={`${item.street_address}, ${item.postal_code}`}
                onPress={showDetails}
                status={item.status}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Pagination */}
      {requestList.length !== 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[styles.paginationButton, meta?.offset === 0 && styles.paginationButtonDisabled]}
            onPress={handlePrev}
            disabled={meta?.offset === 0 || loading}
          >
            <MaterialIcons name="chevron-left" size={24} color={meta?.offset === 0 ? colors.medium : colors.primary} />
            <Text style={[styles.paginationButtonText, meta?.offset === 0 && styles.paginationButtonTextDisabled]}>
              {t('previousText') || 'Previous'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.paginationInfo}>
            <Text style={styles.paginationText}>
              Page {Math.floor(meta?.offset / limit) + 1} of {Math.ceil(meta?.total / limit) || 1}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.paginationButton, meta?.has_more !== 1 && styles.paginationButtonDisabled]}
            onPress={handleNext}
            disabled={meta?.has_more !== 1 || loading}
          >
            <Text style={[styles.paginationButtonText, meta?.has_more !== 1 && styles.paginationButtonTextDisabled]}>
              {t('nextText') || 'Next'}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color={meta?.has_more !== 1 ? colors.medium : colors.primary} />
          </TouchableOpacity>
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
  
  // Title and Filter Section
  titleFilterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  titleContainer: {
    flex: 1,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  
  // Filter Section
  filterSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  
  // Section Title (moved to top)
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.medium,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: colors.medium,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  refreshButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  
  // Jobs List
  jobsList: {
    marginTop: 8,
  },
  
  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  paginationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  paginationButtonDisabled: {
    backgroundColor: '#f8f9fa',
    opacity: 0.5,
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
  paginationInfo: {
    alignItems: 'center',
  },
  paginationText: {
    fontSize: 12,
    color: colors.medium,
  },
});

export default CollectorHomeScreen;
