import { Box, Tab, Tabs, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PathEnums } from '../../app/enum/pathEnums';
import coverImage from '../../assets/images/cover.jpg';
import { VerbTyping } from '../../components/TypingAnimation/TypingAnimation';
import { selectUser } from '../../redux/user/userSelectors';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginAndSignUp() {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const currentPath = location.pathname === PathEnums.Login ? PathEnums.Login : PathEnums.Signup;
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mt: -9.5,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          width: '50%',
          borderTopRightRadius: '20%',
          borderBottomRightRadius: '20%',
          height: '100vh',
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VerbTyping />
      </Box>
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 'auto',
          alignItems: 'center',
          mt: -10,
        }}
      >
        <Tabs
          value={currentPath}
          centered
          className="login-signup-tabs"
          indicatorColor="primary"
          textColor="inherit"
        >
          <Tab label="Login" value={PathEnums.Login} component={Link} to="/login" />
          <Tab label="Signup" value={PathEnums.Signup} component={Link} to="/signup" />
        </Tabs>
        <Outlet />
      </Box>
    </Box>
  );
}
