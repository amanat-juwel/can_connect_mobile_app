import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import colors from '../constants/colors';
import CustomIconButton from '../components/CustomIconButton';
import { useTranslation } from 'react-i18next';
import routes from '../Navigation/routes';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
        t('logoutText') || 'Logout',
        t('logoutConfirmationText') || 'Are you sure you want to logout?',
        [
          {
            text: t('cancelText') || 'Cancel',
            style: 'cancel',
          },
          {
            text: t('logoutText') || 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                // Clear any navigation state first to prevent BackHandler errors
                if (navigation.canGoBack()) {
                  navigation.popToTop();
                }
                
                // Small delay to allow navigation cleanup
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Perform logout API call
                await authApi.logout();
                
                // Additional delay for cleanup
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Finally logout
                logout();
              } catch (error) {
                console.warn('Logout error:', error);
                // Force logout even if API call fails
                logout();
              }
            },
          },
        ]
      );
    } catch (error) {
      console.warn('Logout error:', error);
      // Fallback logout
      logout();
    }
  };

  const handleEdit = () => {
    navigation.navigate(routes.EDIT_PROFILE);
  };

  const handleNotification = () => {
    navigation.navigate(routes.NOTIFICATION_SCREEN);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section with Profile Picture */}
      <View style={styles.headerSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder}>
            <MaterialIcons name="person" size={60} color={colors.white} />
          </View>
          {/* <TouchableOpacity style={styles.editImageButton}>
            <MaterialIcons name="camera-alt" size={20} color={colors.primary} />
          </TouchableOpacity> */}
        </View>
        
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {`${user.first_name} ${user.last_name}`}
          </Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userPhone}>{user.phone}</Text>
        </View>
      </View>

      {/* Action Cards Section */}
      <View style={styles.cardsSection}>
        {/* Edit Profile Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleEdit}>
          <View style={styles.cardIconContainer}>
            <MaterialIcons name="edit" size={24} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('editProfileText') || 'Edit Profile'}</Text>
            <Text style={styles.cardSubtitle}>Update your personal information</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
        </TouchableOpacity>

        {/* Notifications Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleNotification}>
          <View style={styles.cardIconContainer}>
            <MaterialIcons name="notifications" size={24} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{t('notificationText') || 'Notifications'}</Text>
            <Text style={styles.cardSubtitle}>See all notifications</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
        </TouchableOpacity>

        {/* Settings Card */}
        {/* <TouchableOpacity style={styles.actionCard}>
          <View style={styles.cardIconContainer}>
            <MaterialIcons name="settings" size={24} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardSubtitle}>App preferences and configuration</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
        </TouchableOpacity> */}

        {/* Help & Support Card */}
        {/* <TouchableOpacity style={styles.actionCard}>
          <View style={styles.cardIconContainer}>
            <MaterialIcons name="help" size={24} color={colors.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Help & Support</Text>
            <Text style={styles.cardSubtitle}>Get help and contact support</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color={colors.medium} />
        </TouchableOpacity> */}
      </View>

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color={colors.red} />
          <Text style={styles.logoutText}>{t('logoutText') || 'Logout'}</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
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
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  userInfoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },

  // Cards Section
  cardsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  actionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 167, 90, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.medium,
  },

  // Logout Section
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.red,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.red,
    marginLeft: 8,
  },

  // Version Section
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 12,
    color: colors.medium,
  },
});

export default ProfileScreen;
