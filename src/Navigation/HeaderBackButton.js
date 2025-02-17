import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const HeaderBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialIcons name="chevron-left" size={30} style={{ marginLeft: 15 }} />
    </TouchableOpacity>
  );
};
