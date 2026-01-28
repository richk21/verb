import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../redux/user/userActions';
import {
  selectIsLoading,
  selectUser,
  selectUserErrorMessage,
} from '../../redux/user/userSelectors';
import { setLoading } from '../../redux/user/userSlice';
import { IUser } from '../interface/user';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectUserErrorMessage);
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const decodedUser = jwtDecode<{ id: string; name: string; email: string }>(token);
    const userId = decodedUser.id;
    dispatch(UserActions.GetUserProfile(userId));
  }, []);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};
