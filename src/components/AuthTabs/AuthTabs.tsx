import { Box, Tab, Tabs } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { PathEnums } from '../../app/enum/pathEnums';

export const AuthTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname === PathEnums.Login ? PathEnums.Login : PathEnums.Signup;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
      <Tabs
        value={currentPath}
        indicatorColor="primary"
        textColor="inherit"
        className="login-signup-tabs"
        sx={{ minHeight: 0 }}
      >
        <Tab
          label="Login"
          value={PathEnums.Login}
          component={Link}
          to="/login"
          sx={{ minWidth: 0, px: 2, minHeight: 0 }}
        />
        <Tab
          label="Signup"
          value={PathEnums.Signup}
          component={Link}
          to="/signup"
          sx={{ minWidth: 0, px: 2, minHeight: 0 }}
        />
      </Tabs>
    </Box>
  );
};
