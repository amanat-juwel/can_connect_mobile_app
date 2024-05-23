import { useContext } from 'react';
import AuthContext from './context';
import authStorage from './storage';

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (session) => {
    setUser(session.data.user);
    authStorage.storeSession(session.data);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeSession();
  };

  return { user, setUser, login, logout };
};
