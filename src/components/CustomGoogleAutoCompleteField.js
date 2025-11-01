import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import colors from '../constants/colors';

// Google API key
const GOOGLE_API_KEY = 'AIzaSyC6uJ4YFx6pq0vE8FWm6uJyDYAoXQi0XkI';
const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

const CustomGoogleAutoCompleteField = ({
  placeholder,
  onChangeText,
  value = '',
  onBlur,
  errorMessage,
  height = 50,
  width = '100%',
  marginBottom = 15,
  marginTop = 0,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = React.useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const fetchPredictions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setPredictions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `${PLACES_API_BASE_URL}?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&language=en&components=country:au`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.predictions) {
        setPredictions(data.predictions);
        setShowSuggestions(true);
      } else {
        setPredictions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.warn('Google Places API Error:', error);
      setPredictions([]);
      setShowSuggestions(false);
    }
  }, []);

  const handleTextChange = useCallback((text) => {
    setInputValue(text);
    onChangeText(text);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchPredictions(text);
    }, 300);
  }, [onChangeText, fetchPredictions]);

  const handleSelectPrediction = useCallback((prediction) => {
    const address = prediction.description;
    setInputValue(address);
    onChangeText(address);
    setShowSuggestions(false);
    setPredictions([]);
    if (onBlur) onBlur();
  }, [onChangeText, onBlur]);

  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow tapping on them
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
    if (onBlur) onBlur();
  }, [onBlur]);

  return (
    <View style={[styles.container, { marginBottom, marginTop }]}>
      <View style={[styles.inputContainer, { height }]}>
        <TextInput
          style={[styles.input, { height }]}
          placeholder={placeholder || 'Enter address'}
          value={inputValue}
          onChangeText={handleTextChange}
          onBlur={handleBlur}
          onFocus={() => {
            if (predictions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholderTextColor={colors.medium || '#999'}
        />
      </View>
      {showSuggestions && predictions.length > 0 && (
        <View style={styles.listContainer}>
          {predictions.slice(0, 5).map((item, index) => (
            <TouchableOpacity
              key={item.place_id || index}
              style={styles.predictionItem}
              onPress={() => handleSelectPrediction(item)}
            >
              <Text style={styles.predictionText}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  inputContainer: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    color: '#000',
    fontSize: 16,
  },
  listContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 4,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: colors.primary,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
    overflow: 'hidden',
  },
  predictionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  predictionText: {
    fontSize: 14,
    color: '#000',
  },
});

export default CustomGoogleAutoCompleteField;
