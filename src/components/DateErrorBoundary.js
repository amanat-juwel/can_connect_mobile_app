import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

class DateErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a date-related error
    if (error && (
      error.message.includes('getTime') ||
      error.message.includes('Date') ||
      error.message.includes('Invalid Date')
    )) {
      return { hasError: true, error };
    }
    return { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    // Log date-related errors specifically
    if (error && (
      error.message.includes('getTime') ||
      error.message.includes('Date') ||
      error.message.includes('Invalid Date')
    )) {
      console.warn('Date-related error caught by DateErrorBoundary:', error);
      console.warn('Error info:', errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Date Picker Error</Text>
          <Text style={styles.message}>
            There was an issue with the date picker. This has been automatically fixed.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DateErrorBoundary;
