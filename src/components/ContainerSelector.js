import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';

const ContainerSelector = ({
  image,
  label,
  value,
  onAdd,
  onSubtract,
  containerType,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onAdd(containerType)}
      disabled={value > 0}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View>
        {value === 0 ? (
          <View style={styles.dummyCounterContainer}>
            <View style={styles.counterButton}>
              <MaterialIcons name="add" size={24} color={colors.black} />
            </View>
          </View>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => onSubtract(containerType)}
            >
              <MaterialIcons name="remove" size={24} color={colors.black} />
            </TouchableOpacity>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{value}</Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => onAdd(containerType)}
            >
              <MaterialIcons name="add" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    height: 200,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dummyCounterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  counterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 4,
  },
});

export default ContainerSelector;
