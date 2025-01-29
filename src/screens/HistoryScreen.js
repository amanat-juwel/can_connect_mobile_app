import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import routes from '../Navigation/routes';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import HistoryItem from '../components/HistoryItem';
import CustomButton from '../components/CustomButton';
import FilterComponent from '../components/FilterComponent';
import ToastManager, { Toast } from 'toastify-react-native';

const limit = 5;

const HistoryScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([]);
  const [meta, setMeta] = useState({});
  const [payload, setPayload] = useState({
    offset: 0,
    self_only: true,
    limit: limit,
    sort_by: 'id',
    order_by: 'DESC',
  });
  const { t } = useTranslation();

  const getHistory = async (payload) => {
    console.log('payload history', payload);
    const result = await commonApi.getHistory(payload);
    if (result.ok && result.data.success) {
      setHistory(result.data.data.result);
      setMeta(result.data.data.meta);
    }
  };

  useEffect(() => {
    getHistory(payload);
  }, []);

  const handleNext = () => {
    if (meta?.has_more !== 1) {
      return;
    }
    setPayload((prev) => {
      const newPayload = { ...prev, offset: prev.offset + limit };
      getHistory(newPayload);
      return newPayload;
    });
  };

  const handlePrev = () => {
    if (meta?.offset === 0) {
      return;
    }
    setPayload((prev) => {
      const newPayload = {
        ...prev,
        offset: Math.max(prev.offset - limit, 0),
      };
      getHistory(newPayload);
      return newPayload;
    });
  };

  const applyFilter = (filterPayload) => {
    const { state, city, status, ...otherProps } = filterPayload;
    setPayload((prev) => {
      const newPayload = {
        ...prev,
        ...otherProps,
        offset: 0,
        state_id: state?.id || '',
        city_id: city?.id || '',
        status: status?.name.toLowerCase() || '',
      };

      getHistory(newPayload);
      console.log('newPayload', newPayload);

      return newPayload;
    });
  };

  const showDetails = (id) => {
    const request = history.find((item) => item.sku === id);
    navigation.navigate(routes.HISTORY_DETAILS_SCREEN, { request: request });
  };

  useEffect(() => {
    const { showToast } = route.params || {};
    if (showToast) {
      Toast.success(t('completeRequestSuccessText'));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterComponent applyFilter={applyFilter} />
      </View>
      <View style={styles.itemContainer}>
        <ToastManager />
        {history.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.headingLabel}>{t('noHistoryText')}</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <HistoryItem
                id={item.sku}
                date={`${item.preferred_pick_date} ${item.preferred_pick_time}`}
                address={`${item.street_address}, ${item.city.name}, ${item.state.name}, ${item.postal_code}`}
                status={item.status}
                onPress={showDetails}
              />
            )}
          />
        )}
      </View>
      {history.length !== 0 && (
        <View style={styles.navigationContainer}>
          <View style={styles.button}>
            <CustomButton
              label={t('previousText')}
              onPress={handlePrev}
              disabled={meta?.offset === 0}
            />
          </View>
          <View style={styles.button}>
            <CustomButton
              label={t('nextText')}
              onPress={handleNext}
              disabled={meta?.has_more !== 1}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  filterContainer: {
    width: '100%',
  },
  textContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  headingLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  itemContainer: {
    flex: 3,
    width: '100%',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default HistoryScreen;
