/**
 * BackHandler Patch Utility
 * This patches the BackHandler to prevent removeEventListener errors
 * that occur during logout and navigation transitions
 */

import { BackHandler, Platform } from 'react-native';

// Patch BackHandler to prevent removeEventListener errors
export const patchBackHandler = () => {
  if (Platform.OS === 'android' && BackHandler) {
    // Store original methods
    const originalAddEventListener = BackHandler.addEventListener;
    const originalRemoveEventListener = BackHandler.removeEventListener;
    
    // Override addEventListener to return a mock subscription
    BackHandler.addEventListener = (eventName, handler) => {
      try {
        if (originalAddEventListener) {
          return originalAddEventListener(eventName, handler);
        }
      } catch (error) {
        console.warn('BackHandler.addEventListener error (patched):', error);
      }
      
      // Return a mock subscription object
      return {
        remove: () => {
          try {
            if (originalRemoveEventListener) {
              originalRemoveEventListener(eventName, handler);
            }
          } catch (error) {
            // Silently ignore remove errors
          }
        }
      };
    };
    
    // Override removeEventListener to be safe
    BackHandler.removeEventListener = (eventName, handler) => {
      try {
        if (originalRemoveEventListener) {
          return originalRemoveEventListener(eventName, handler);
        }
      } catch (error) {
        // Silently ignore remove errors
      }
      
      // Return a mock subscription object
      return {
        remove: () => {}
      };
    };
    
    console.log('BackHandler patched successfully');
  }
};

// Auto-patch when this module is imported
patchBackHandler();
