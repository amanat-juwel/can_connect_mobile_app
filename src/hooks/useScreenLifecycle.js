import React, { useEffect, useRef } from 'react';
import { Platform, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Custom hook to handle screen lifecycle and prevent BackHandler errors
 * This is particularly useful for preventing the "removeEventListener is not a function" error
 */
export const useScreenLifecycle = () => {
  const backHandlerRef = useRef(null);

  // Handle screen focus
  useFocusEffect(
    React.useCallback(() => {
      // Screen is focused
      return () => {
        // Screen is unfocused - cleanup any BackHandler listeners
        if (backHandlerRef.current) {
          try {
            if (Platform.OS === 'android' && BackHandler && typeof BackHandler.removeEventListener === 'function') {
              BackHandler.removeEventListener('hardwareBackPress', backHandlerRef.current);
            }
          } catch (error) {
            console.warn('Failed to remove BackHandler listener during unfocus:', error);
          }
          backHandlerRef.current = null;
        }
      };
    }, [])
  );

  // Handle screen unmount
  useEffect(() => {
    return () => {
      // Screen is unmounting - ensure cleanup
      if (backHandlerRef.current) {
        try {
          if (Platform.OS === 'android' && BackHandler && typeof BackHandler.removeEventListener === 'function') {
            BackHandler.removeEventListener('hardwareBackPress', backHandlerRef.current);
          }
        } catch (error) {
          console.warn('Failed to remove BackHandler listener during unmount:', error);
        }
        backHandlerRef.current = null;
      }
    };
  }, []);

  // Function to safely add BackHandler listener
  const addBackHandler = (listener) => {
    try {
      if (Platform.OS === 'android' && BackHandler && typeof BackHandler.addEventListener === 'function') {
        // Remove any existing listener first
        if (backHandlerRef.current) {
          BackHandler.removeEventListener('hardwareBackPress', backHandlerRef.current);
        }
        
        // Add new listener
        BackHandler.addEventListener('hardwareBackPress', listener);
        backHandlerRef.current = listener;
        
        return () => {
          try {
            if (backHandlerRef.current === listener) {
              BackHandler.removeEventListener('hardwareBackPress', listener);
              backHandlerRef.current = null;
            }
          } catch (error) {
            console.warn('Failed to remove BackHandler listener:', error);
          }
        };
      }
    } catch (error) {
      console.warn('Failed to add BackHandler listener:', error);
    }
    
    return () => {};
  };

  return { addBackHandler };
};
