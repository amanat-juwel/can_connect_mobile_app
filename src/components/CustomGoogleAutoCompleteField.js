import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from '../constants/colors';

// You should move this to an environment variable or config file
const GOOGLE_API_KEY = 'AIzaSyC6uJ4YFx6pq0vE8FWm6uJyDYAoXQi0XkI';

const CustomGoogleAutoCompleteField = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  errorMessage,
  height = 50,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  const ref = React.useRef();
  const [apiFailed, setApiFailed] = React.useState(false);

  const handlePlaceSelect = React.useCallback(
    (data, details = null) => {
      try {
        if (data && data.description) {
          onChangeText(data.description);
          if (onBlur) onBlur();
        }
      } catch (error) {
        console.warn('Error handling place selection:', error);
        // Fallback to manual entry
        if (data && data.description) {
          onChangeText(data.description);
        }
      }
    },
    [onChangeText, onBlur],
  );

  const handleError = React.useCallback((error) => {
    console.warn('Google Places API Error:', error);
    // Switch to fallback text input
    setApiFailed(true);
  }, []);

  const handleFallbackChange = React.useCallback((text) => {
    onChangeText(text);
  }, [onChangeText]);

  React.useEffect(() => {
    try {
      if (ref.current && value && !apiFailed) {
        ref.current.setAddressText(value);
      }
    } catch (error) {
      console.warn('Error setting address text:', error);
      setApiFailed(true);
    }
  }, [value, apiFailed]);

  // Fallback to regular text input if Google Places API fails
  if (apiFailed) {
    return (
      <View style={[styles.container, { height, width, marginBottom, marginTop }]}>
        <TextInput
          style={styles.fallbackInput}
          placeholder={placeholder || 'Enter address manually'}
          value={value}
          onChangeText={handleFallbackChange}
          onBlur={onBlur}
          placeholderTextColor={colors.medium || '#999'}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { height, width, marginBottom, marginTop }]}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder || 'Enter address'}
        minLength={2}
        debounce={300}
        disableScroll={false}
        fetchDetails={false}
        onPress={handlePlaceSelect}
        onNotFound={() => console.log('No results found')}
        onFail={handleError}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        textInputProps={{
          onBlur,
          placeholderTextColor: colors.medium || '#999',
          style: styles.input,
        }}
        enablePoweredByContainer={false}
        styles={{
          container: styles.autoCompleteContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed="auto"
        renderRow={(data) => (
          <View style={styles.row}>
            <Text style={styles.description}>
              {data.description}
            </Text>
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
    zIndex: 1,
  },
  autoCompleteContainer: {
    flex: 0,
  },
  textInput: {
    height: '100%',
    paddingLeft: 20,
    borderRadius: 10,
    color: '#000',
    fontSize: 16,
    backgroundColor: 'transparent',
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
  fallbackInput: {
    height: 50,
    paddingLeft: 20,
    borderRadius: 10,
    color: '#000',
    fontSize: 16,
  },
});

export default CustomGoogleAutoCompleteField;
