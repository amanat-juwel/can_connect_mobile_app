import { Platform, BackHandler } from 'react-native';

/**
 * Safely removes event listeners for BackHandler
 * This prevents errors on platforms where BackHandler is not available
 */
export const safeRemoveBackHandlerListener = (listener) => {
  if (Platform.OS === 'android' && BackHandler && typeof BackHandler.removeEventListener === 'function') {
    try {
      BackHandler.removeEventListener('hardwareBackPress', listener);
    } catch (error) {
      console.warn('Failed to remove BackHandler listener:', error);
    }
  }
};

/**
 * Safely adds event listeners for BackHandler
 * This prevents errors on platforms where BackHandler is not available
 */
export const safeAddBackHandlerListener = (listener) => {
  if (Platform.OS === 'android' && BackHandler && typeof BackHandler.addEventListener === 'function') {
    try {
      BackHandler.addEventListener('hardwareBackPress', listener);
      return () => safeRemoveBackHandlerListener(listener);
    } catch (error) {
      console.warn('Failed to add BackHandler listener:', error);
      return () => {};
    }
  }
  return () => {};
};

/**
 * Check if BackHandler is available on current platform
 */
export const isBackHandlerAvailable = () => {
  return Platform.OS === 'android' && BackHandler && typeof BackHandler.addEventListener === 'function';
};
