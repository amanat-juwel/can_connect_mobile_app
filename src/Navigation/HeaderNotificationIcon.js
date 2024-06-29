import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import routes from './routes';
import commonApi from '../api/common';

export const HeaderNotificationIcon = ({}) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const navigation = useNavigation();

  const getNotificationCount = async () => {
    const result = await commonApi.getNotificationCount();
    if (result.ok && result.data.success) {
      setNotificationCount(result.data.data.pending_notification);
    }
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.NOTIFICATION_SCREEN)}
      style={{ marginRight: 10 }}
    >
      <View style={{ position: 'relative' }}>
        <Ionicons
          name="notifications-outline"
          size={30}
          style={{ color: colors.white }}
        />
        {notificationCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: colors.white,
              borderRadius: 10,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 12 }}>
              {notificationCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
