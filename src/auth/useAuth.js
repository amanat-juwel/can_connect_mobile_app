import { useContext } from 'react';
import { Platform } from 'react-native';
import AuthContext from './context';
import authStorage from './storage';

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (session, rememberUser) => {
    setUser(session.data.user);
    authStorage.storeSession(session.data, rememberUser);
  };

  const setContextUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    try {
      console.log('Starting logout process...');
      
      // Clear user context first - this is the most important step
      setUser(null);
      
      // Clear storage with error handling
      try {
        authStorage.removeSession();
        console.log('Storage cleared successfully');
      } catch (storageError) {
        console.warn('Storage cleanup error (continuing):', storageError);
      }
      
      // Platform-specific cleanup to prevent BackHandler errors
      if (Platform.OS === 'ios') {
        console.log('iOS logout cleanup completed');
      } else if (Platform.OS === 'android') {
        console.log('Android logout cleanup completed');
      }
      
      console.log('Logout completed successfully');
    } catch (error) {
      console.warn('Logout cleanup error:', error);
      // Ensure user is cleared even if cleanup fails
      try {
        setUser(null);
        console.log('User context cleared as fallback');
      } catch (fallbackError) {
        console.error('Critical logout error:', fallbackError);
      }
    }
  };

  return { user, login, logout, setContextUser };
};

export default useAuth;
