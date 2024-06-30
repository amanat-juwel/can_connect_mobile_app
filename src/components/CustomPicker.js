import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Text,
} from 'react-native';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomPickerItem from './CustomPickerItem';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from './CustomLinkButton';

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
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
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
          <View style={styles.modalButton}>
            <CustomLinkButton
              text={t('closeText')}
              onPress={() => setModalVisible(false)}
              fontSize={18}
              fontWeight="bold"
              LinkColor={colors.primary}
            />
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    color: colors.grey,
    overflow: 'hidden',
  },
  iconContainer: {
    paddingRight: 10,
  },
  modal: {
    marginTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CustomPicker;
