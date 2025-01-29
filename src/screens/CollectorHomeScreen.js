import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import routes from '../Navigation/routes';
import { useTranslation } from 'react-i18next';
import colors from '../constants/colors';
import commonApi from '../api/common';
import CustomButton from '../components/CustomButton';
import FilterComponent from '../components/FilterComponent';
import CollectorHomeItem from '../components/CollectorHomeItem';

const limit = 5;

const CollectorHomeScreen = ({ navigation }) => {
  const [requestList, setRequestList] = useState([]);
  const [meta, setMeta] = useState({});
  const [payload, setPayload] = useState({
    offset: 0,
    limit: limit,
    sort_by: 'id',
    order_by: 'DESC',
  });
  const { t } = useTranslation();

  const getRequestList = async (payload) => {
    console.log('payload', payload);
    const result = await commonApi.getRequestList(payload);
    if (result.ok && result.data.success) {
      setRequestList(result.data.data.result);
      setMeta(result.data.data.meta);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getRequestList(payload);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (meta?.has_more !== 1) {
      return;
    }
    setPayload((prev) => {
      const newPayload = { ...prev, offset: prev.offset + limit };
      getRequestList(newPayload);
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
      getRequestList(newPayload);
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
      };

      getRequestList(newPayload);
      console.log(newPayload);

      return newPayload;
    });
  };

  const showDetails = (id) => {
    const request = requestList.find((item) => item.sku === id);
    navigation.navigate(routes.REQUEST_DETAILS_SCREEN, { request: request });
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterComponent applyFilter={applyFilter} includeStatus={false} />
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.pageHeadingLabel}>{t('activeJobsText')}</Text>
        </View>
        {requestList.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.headingLabel}>{t('noRequestText')}</Text>
          </View>
        ) : (
          <FlatList
            data={requestList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CollectorHomeItem
                id={item.sku}
                items={item.items}
                date={`${item.preferred_pick_date} ${item.preferred_pick_time}`}
                address={`${item.street_address}, ${item.city.name}, ${item.state.name}, ${item.postal_code}`}
                onPress={showDetails}
              />
            )}
          />
        )}
      </View>
      {requestList.length !== 0 && (
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
  pageHeadingLabel: {
    fontSize: 22,
    fontWeight: '800',
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

export default CollectorHomeScreen;
