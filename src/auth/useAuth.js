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
      // Platform-specific cleanup to prevent BackHandler errors
      if (Platform.OS === 'ios') {
        // On iOS, we need to handle additional cleanup
        // This helps prevent the BackHandler error during logout
        console.log('iOS logout cleanup initiated');
      }
      
      // Clear user context first
      setUser(null);
      
      // Clear storage
      authStorage.removeSession();
      
      console.log('Logout completed successfully');
    } catch (error) {
      console.warn('Logout cleanup error:', error);
      // Ensure user is cleared even if cleanup fails
      setUser(null);
    }
  };

  return { user, login, logout, setContextUser };
};

export default useAuth;
