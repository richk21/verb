import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUser } from '../../redux/user/userSelectors';
import { Button, CircularProgress } from '@mui/material';
import { resetAuthToken, resetUser } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsLoading);

  const handleLogout = () => {
    Cookies.remove('token');
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
