import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '../constants/colors';

const GOOGLE_API_KEY = 'AIzaSyC6uJ4YFx6pq0vE8FWm6uJyDYAoXQi0XkI';

const CustomGoogleAutoCompleteField = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
}) => {
  const ref = React.useRef();

  const handlePlaceSelect = React.useCallback(
    (data, details = null) => {
      if (data.description) {
        onChangeText(data.description);
        onBlur();
      } else {
        console.log('No description found in data');
      }
    },
    [onChangeText, onBlur],
  );

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAddressText(value || '');
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        debounce={300}
        ref={ref}
        disableScroll={true}
        placeholder={placeholder}
        minLength={2}
        fetchDetails={true}
        onPress={handlePlaceSelect}
        onNotFound={() => console.log('No results found')}
        onFail={(error) => {
          console.log('Google Places Error:', error);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          components: 'country:au',
        }}
        textInputProps={{
          onBlur,
          placeholderTextColor: colors.medium,
        }}
        enablePoweredByContainer={false}
        styles={{
          textInput: styles.input,
          container: styles.autoCompleteContainer,
          listView: styles.listView,
        }}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed="auto"
        renderRow={(data) => (
          <View style={styles.row} onPress={() => handlePlaceSelect(data)}>
            <Text style={styles.description}>{data.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    zIndex: 1,
  },
  autoCompleteContainer: {
    flex: 0,
  },
  input: {
    height: 50,
    paddingLeft: 20,
    borderRadius: 10,
    color: '#000',
    fontSize: 16,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    zIndex: 999,
  },
  row: {
    padding: 13,
    height: 44,
  },
  description: {
    fontSize: 14,
  },
});

export default CustomGoogleAutoCompleteField;
