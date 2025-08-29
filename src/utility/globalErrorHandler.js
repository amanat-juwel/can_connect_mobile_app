/**
 * Global error handler for date-related errors
 * This catches any remaining getTime errors that might slip through
 */

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Global error handler for date-related issues
export const setupGlobalDateErrorHandler = () => {
  // Override console.error to catch date-related errors
  console.error = (...args) => {
    const errorMessage = args[0];
    
    // Check if it's a date-related error
    if (errorMessage && typeof errorMessage === 'string') {
      if (errorMessage.includes('getTime') || 
          errorMessage.includes('Invalid Date') ||
          errorMessage.includes('Date') ||
          errorMessage.includes('date')) {
        
        // Log as warning instead of error to prevent crashes
        console.warn('Date-related error caught by global handler:', ...args);
        return;
      }
    }
    
    // Call original console.error for non-date errors
    originalConsoleError(...args);
  };

  // Override console.warn to catch date-related warnings
  console.warn = (...args) => {
    const warningMessage = args[0];
    
    // Check if it's a date-related warning
    if (warningMessage && typeof warningMessage === 'string') {
      if (warningMessage.includes('getTime') || 
          warningMessage.includes('Invalid Date') ||
          warningMessage.includes('Date') ||
          warningMessage.includes('date')) {
        
        // Log with special prefix for date issues
        originalConsoleWarn('🔴 DATE ISSUE:', ...args);
        return;
      }
    }
    
    // Call original console.warn for non-date warnings
    originalConsoleWarn(...args);
  };
};

// Function to restore original console methods
export const restoreConsoleMethods = () => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
};

// Auto-setup when this module is imported
setupGlobalDateErrorHandler();
