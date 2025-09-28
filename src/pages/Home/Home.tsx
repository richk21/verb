import { Button, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoading, selectUser } from '../../redux/user/userSelectors';
import { resetAuthToken, resetUser } from '../../redux/user/userSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    Cookies.remove('authToken');
    dispatch(resetUser());
    dispatch(resetAuthToken());
    navigate('/login');
  };

  console.log(user?.name, user?.email);

  if (isUserLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="home-container">
      Hello {user?.name}
      <Button variant="contained" color="primary" onClick={handleLogout}>
        logout
      </Button>
    </div>
  );
};
