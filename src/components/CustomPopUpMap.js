import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from './CustomLinkButton';
import CustomLabel from './CustomLabel';
import MapView, { Marker } from 'react-native-maps';

const CustomPopUpMap = ({
  title,
  onClose,
  modalVisible,
  markerPosition,
  setMarkerPosition,
}) => {
  const { t } = useTranslation();

  const handleMarkerDragEnd = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log(latitude, longitude);
    setMarkerPosition({ latitude, longitude });
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: markerPosition?.latitude,
                longitude: markerPosition?.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Marker
                coordinate={markerPosition}
                onDragEnd={handleMarkerDragEnd}
              />
            </MapView>
          </View>
          <View style={styles.modalButton}>
            <CustomLinkButton
              text={t('closeText')}
              onPress={onClose}
              fontSize={18}
              fontWeight="bold"
              LinkColor={colors.primary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: '80%',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CustomPopUpMap;
