import { useContext } from 'react';
import AuthContext from './context';
import authStorage from './storage';

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const login = (session, rememberUser) => {
    setUser(session.data.user);
    authStorage.storeSession(session.data, rememberUser);
  };

  const setContextUser = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeSession();
  };

  return { user, login, logout, setContextUser };
};
