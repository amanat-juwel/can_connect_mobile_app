import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import routes from './routes';

export const HeaderNotificationIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.NOTIFICATION_SCREEN)}
    >
      <Ionicons
        name="notifications-outline"
        size={30}
        style={{ color: colors.white }}
      />
    </TouchableOpacity>
  );
};
