import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import colors from '../constants/colors';
import { useTranslation } from 'react-i18next';
import CustomLinkButton from './CustomLinkButton';
import { WebView } from 'react-native-webview';
import CustomLabel from './CustomLabel';

const CustomPopUpWebView = ({ title, htmlString, onClose, modalVisible }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.titleContainer}>
            <CustomLabel text={title} />
          </View>
          <View style={styles.webViewContainer}>
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlString }}
              style={styles.webView}
            />
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
    marginBottom: 30,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  webView: {
    flex: 1,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
  },
});

export default CustomPopUpWebView;
