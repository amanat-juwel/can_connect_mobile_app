import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import routes from '../Navigation/routes';
import colors from '../constants/colors';
import commonApi from '../api/common';
import publicApi from '../api/public';
import CustomButton from '../components/CustomButton';
import { useTranslation } from 'react-i18next';
import ContainerSelector from '../components/ContainerSelector';

const CollectorHomeScreen = ({ navigation }) => {
  const [homePageSlider, setHomePageSlider] = useState([]);
  const [containerTypes, setContainerTypes] = useState([]);
  const [itemMap, setItemMap] = useState({});
  const [unit, setUnit] = useState();

  const { t } = useTranslation();

  const getHomePageSlider = async () => {
    const result = await commonApi.getHomePage();

    if (result.ok && result.data.success) {
      setHomePageSlider(result.data.data.slider);
    }
  };

  const getContainerTypes = async () => {
    const result = await publicApi.getConstants();
    if (result.ok && result.data.success) {
      setContainerTypes(result.data.data.eligible_containers);
      setUnit(result.data.data.unit[0] || 'Pcs');
    }
  };

  const onAdd = (containerType) => {
    setItemMap((itemMap) => {
      const newMap = { ...itemMap };
      newMap[containerType] = (newMap[containerType] | 0) + 1;
      return newMap;
    });
  };

  const onSubtract = (containerType) => {
    setItemMap((itemMap) => {
      const newMap = { ...itemMap };
      newMap[containerType] =
        newMap[containerType] > 0 ? newMap[containerType] - 1 : 0;
      return newMap;
    });
  };

  useEffect(() => {
    getContainerTypes();

    const timer = setTimeout(() => {
      getHomePageSlider();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    const items = Object.keys(itemMap)
      .filter((key) => itemMap[key] !== 0)
      .map((key) => ({
        type: key,
        qty: String(itemMap[key]),
        unit: unit,
      }));

    console.log(items);
    if (items.length < 1) return;

    navigation.navigate(routes.RECYCLE_SCREEN, { items });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: homePageSlider[0] && homePageSlider[0].image,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.gridContainer}>
          {containerTypes.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <ContainerSelector
                label={t(item.title)}
                containerType={item.title}
                value={itemMap[item.title] || 0}
                image={item.image}
                onAdd={onAdd}
                onSubtract={onSubtract}
              />
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton label={t('nextText')} onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemContainer: {
    width: '49%',
    marginBottom: 10,
  },
});

export default CollectorHomeScreen;
