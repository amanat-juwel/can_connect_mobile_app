import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../auth/useAuth';
import userType from '../constants/userType';
import requestorApi from '../api/requestor';
import collectorApi from '../api/Collector';
import routes from '../Navigation/routes';

const { width } = Dimensions.get('window');

const RequestDetailsScreen = ({ route, navigation }) => {
  const request = route.params?.request;
  const [requestTrail, setRequestTrail] = useState();
  const [distance, getDistance] = useState();
  const { t } = useTranslation();
  const { user } = useAuth();

  const getStatusColor = (status) => {
    const colorMap = {
      pending: colors.orange,
      accepted: colors.primary,
      cancelled: colors.red,
      completed: colors.darkGreen,
    };
    return colorMap[status] || colors.medium;
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      const displayMinutes = minutes.padStart(2, '0');
      return `${displayHour}:${displayMinutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  const getRequestTrailData = async (sku) => {
    const result = await requestorApi.getRequestTrail(sku);
    if (result.ok && result.data.success) {
      setRequestTrail(result.data.data.audit_trails);
    }
  };

  const getDistanceData = async (sku) => {
    const result = await collectorApi.getDistance(sku);
    if (result.ok && result.data.success) {
      getDistance(result.data.data.distance.text);
    }
  };

  const acceptRequest = async () => {
    const result = await collectorApi.acceptRequest({
      sku: request.sku,
      status: 'accepted',
    });
    if (result.ok && result.data.success) {
      navigation.navigate({
        name: routes.HOME_SCREEN,
        key: `${routes.HOME_SCREEN}-${Date.now()}`,
        params: { showToast: true },
      });
    }
  };

  useEffect(() => {
    if (user && user?.category === userType.REQUESTOR) {
      getRequestTrailData({ sku: request.sku });
    } else {
      getDistanceData({ sku: request.sku });
    }
  }, []);
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <View style={styles.requestInfo}>
            <Text style={styles.requestId}>ID# {request.sku}</Text>
            <View style={[styles.statusChip, { backgroundColor: getStatusColor(request.status) }]}>
              <Text style={styles.statusText}>{request.status}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date & Time Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="schedule" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Pickup Schedule</Text>
          </View>
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeItem}>
              <MaterialIcons name="calendar-today" size={18} color={colors.medium} />
              <Text style={styles.dateTimeLabel}>Date: </Text>
              <Text style={styles.dateTimeValue}>{formatDate(request.preferred_pick_date)}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <MaterialIcons name="access-time" size={18} color={colors.medium} />
              <Text style={styles.dateTimeLabel}>Time: </Text>
              <Text style={styles.dateTimeValue}>{formatTime(request.preferred_pick_time)}</Text>
            </View>
          </View>
        </View>

        {/* Items Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="recycle-variant" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Items to Collect</Text>
          </View>
          <View style={styles.itemsList}>
            {request.items.map((item, index) => (
              <View key={item.item_id} style={styles.itemRow}>
                <View style={styles.itemIcon}>
                  <MaterialCommunityIcons
                    name="recycle-variant"
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <Text style={styles.itemText}>
                  {item.qty} {item.unit} of {item.type}
                </Text>
              </View>
            ))}
            {request.note?.length > 0 && (
              <View style={styles.noteContainer}>
                <MaterialIcons name="note" size={16} color={colors.medium} />
                <Text style={styles.noteText}>{request.note}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tracking Timeline */}
        {requestTrail && requestTrail.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialIcons name="timeline" size={24} color={colors.primary} />
              <Text style={styles.cardTitle}>Request Timeline</Text>
            </View>
            <View style={styles.timeline}>
              {requestTrail.map((item, index) => (
                <View key={item.created_at} style={styles.timelineItem}>
                  <View style={styles.timelineIcon}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTime}>{item.readable_created_time}</Text>
                    <Text style={styles.timelineText}>{item.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Contact Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="contact-phone" size={24} color={colors.primary} />
            <Text style={styles.cardTitle}>Contact Details</Text>
          </View>
          <View style={styles.contactList}>
            <View style={styles.contactRow}>
              <MaterialIcons name="person" size={20} color={colors.medium} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Name</Text>
                <Text style={styles.contactValue}>
                  {request.requestor.first_name} {request.requestor.last_name}
                </Text>
              </View>
            </View>
            
            <View style={styles.contactRow}>
              <MaterialIcons name="phone" size={20} color={colors.medium} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{request.requestor.phone}</Text>
              </View>
            </View>
            
            <View style={styles.contactRow}>
              <MaterialIcons name="email" size={20} color={colors.medium} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{request.requestor.email}</Text>
              </View>
            </View>
            
            <View style={styles.contactRow}>
              <MaterialIcons name="location-on" size={20} color={colors.medium} />
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>
                  {request.street_address}, {request.postal_code}
                </Text>
              </View>
            </View>
            
            {distance && (
              <View style={styles.contactRow}>
                <MaterialIcons name="directions" size={20} color={colors.medium} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Distance</Text>
                  <Text style={styles.contactValue}>
                    {distance} {t('distanceDescriptionText') || 'away'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      {request.status === 'pending' && (
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.acceptButton} onPress={acceptRequest}>
            <MaterialIcons name="check-circle" size={24} color={colors.white} />
            <Text style={styles.acceptButtonText}>
              {t('AcceptRequestText') || 'Accept Request'}
            </Text>
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
  
  // Header Section
  headerSection: {
    // backgroundColor: colors.primary,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  requestId: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
  },
  statusChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  // Card Styles
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
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
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 10,
  },
  
  // Date & Time
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: colors.medium,
    marginLeft: 6,
    fontWeight: '500',
  },
  dateTimeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 4,
  },
  
  // Items List
  itemsList: {
    marginTop: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    color: colors.black,
    flex: 1,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
  
  // Timeline
  timeline: {
    marginTop: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 167, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineTime: {
    fontSize: 12,
    color: colors.medium,
    marginBottom: 4,
  },
  timelineText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  
  // Contact Details
  contactList: {
    marginTop: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: colors.medium,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  
  // Action Section
  actionSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  acceptButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  acceptButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default RequestDetailsScreen;
