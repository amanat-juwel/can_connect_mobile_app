import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomPickerItem from './CustomPickerItem';
import CustomButton from './CustomButton';
import { useTranslation } from 'react-i18next';

const CustomPicker = ({
  label,
  items,
  selectedItem,
  onSelectItem,
  height = 60,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const onModalItemPress = (item) => {
    console.log(item);
    setModalVisible(false);
    onSelectItem(item);
  };
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View
          style={[styles.container, { height, width, marginBottom, marginTop }]}
        >
          <Text style={styles.label}>
            {selectedItem ? selectedItem.name : label}
          </Text>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={35}
              color={colors.grey}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modal}>
          <CustomButton
            label={t('closeText')}
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CustomPickerItem
                label={item.name}
                onPress={() => onModalItemPress(item)}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  label: {
    width: '85%',
    paddingVertical: 20,
    color: colors.grey,
  },
  iconContainer: {
    padding: 10,
  },
  modal: {
    marginTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
});

export default CustomPicker;
