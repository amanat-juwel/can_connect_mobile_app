import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import colors from '../constants/colors';
import CustomIconButton from '../components/CustomIconButton';
import { useTranslation } from 'react-i18next';
import routes from '../Navigation/routes';

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
    <View style={styles.container}>
      <View style={styles.topComponent}>
        <View style={styles.nameContainer}>
          <Text
            style={styles.userName}
          >{`${user.first_name} ${user.last_name}`}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.emailAndPhone}>{user.email}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.emailAndPhone}>{user.phone}</Text>
        </View>
      </View>
      <View style={styles.middleComponent}>
        <CustomIconButton
          label={t('editProfileText')}
          onPress={handleEdit}
          iconName="edit-note"
          buttonType="top"
        />
        <CustomIconButton
          label={t('notificationText')}
          onPress={handleNotification}
          iconName="notifications"
          buttonType="bottom"
        />
      </View>
      <View style={styles.bottomComponent}>
        <CustomIconButton
          label={t('logoutText')}
          onPress={handleLogout}
          iconName="logout"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  nameContainer: {
    alignSelf: 'center',
    marginBottom: 4,
  },
  textContainer: {
    alignSelf: 'center',
  },
  userName: {
    fontSize: 26,
    fontWeight: '500',
    color: colors.white,
  },
  emailAndPhone: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  topComponent: {
    flex: 1,
  },
  middleComponent: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  bottomComponent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ProfileScreen;
