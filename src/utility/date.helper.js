import { Platform } from 'react-native';

/**
 * Safely formats a date without using getTime
 * @param {Date} date - The date to format
 * @param {string} format - 'date' or 'time'
 * @returns {string} Formatted date string or empty string if invalid
 */
export const safeFormatDate = (date, format = 'date') => {
  try {
    if (!date || !(date instanceof Date)) {
      return '';
    }

    if (format === 'date') {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else if (format === 'time') {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return '';
  } catch (error) {
    console.warn('Safe date formatting error:', error);
    return '';
  }
};

/**
 * Safely validates if a date is valid without using getTime
 * @param {Date} date - The date to validate
 * @returns {boolean} True if date is valid
 */
export const isDateValid = (date) => {
  try {
    if (!date || !(date instanceof Date)) {
      return false;
    }

    // Check if date components are reasonable without getTime
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return (
      year >= 1900 && year <= 2100 &&
      month >= 0 && month <= 11 &&
      day >= 1 && day <= 31
    );
  } catch (error) {
    console.warn('Date validation error:', error);
    return false;
  }
};

/**
 * Safely creates a date from string without getTime validation
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Date object or null if invalid
 */
export const safeCreateDate = (dateString) => {
  try {
    if (!dateString || typeof dateString !== 'string') {
      return null;
    }

    const date = new Date(dateString);
    
    // Validate the created date without getTime
    if (isDateValid(date)) {
      return date;
    }
    
    return null;
  } catch (error) {
    console.warn('Safe date creation error:', error);
    return null;
  }
};

/**
 * Safely formats time string without Date object manipulation
 * @param {string} timeString - Time string in HH:MM:SS format
 * @returns {string} Formatted time string or empty string if invalid
 */
export const safeFormatTime = (timeString) => {
  try {
    if (!timeString || typeof timeString !== 'string') {
      return '';
    }

    // Extract time parts using regex - no Date objects
    const timeMatch = timeString.match(/^(\d{2}):(\d{2}):(\d{2})/);
    if (!timeMatch) {
      return '';
    }

    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);

    // Validate time components
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return '';
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  } catch (error) {
    console.warn('Safe time formatting error:', error);
    return '';
  }
};

/**
 * Gets current date in safe format
 * @returns {string} Current date in YYYY-MM-DD format
 */
export const getCurrentDate = () => {
  try {
    const now = new Date();
    return safeFormatDate(now, 'date');
  } catch (error) {
    console.warn('Get current date error:', error);
    return '';
  }
};

/**
 * Gets current time in safe format
 * @returns {string} Current time in HH:MM format
 */
export const getCurrentTime = () => {
  try {
    const now = new Date();
    return safeFormatDate(now, 'time');
  } catch (error) {
    console.warn('Get current time error:', error);
    return '';
  }
};

/**
 * Check if a person is an adult based on date of birth
 * @param {string} dobString - Date of birth string
 * @returns {boolean} True if person is 15 or older
 */
export function isAdult(dobString) {
  try {
    const adultAge = 15;
    const dob = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age >= adultAge;
  } catch (error) {
    console.warn('Age calculation error:', error);
    return false;
  }
}

/**
 * Format date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  try {
    const date = new Date(dateString.replace(' ', 'T'));

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return dateString;
  }
}
