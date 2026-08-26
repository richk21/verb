import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/user/userSelectors';
import { resetAuthToken, resetUser } from '../../redux/user/userSlice';
import { DropdownWithIcon } from '../DropdownWithIcon/ProfileMenuButton';
import { SearchBar } from '../SearchBar/SearchBar';
import './navbar.scss';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const getIconClass = (path: string, isDark: boolean) => {
  const isActive = location.pathname === path;
  if (isDark) {
    return isActive ? `nav-icon dark-active` : `nav-icon dark-inactive`;
  } else {
    return isActive ? `nav-icon light-active` : `nav-icon light-inactive`;
  }
};
export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isRoot = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const user = useSelector(selectUser);
  const handleLogout = () => {
    Cookies.remove('authToken');
    dispatch(resetUser());
    dispatch(resetAuthToken());
    navigate('../');
  };
  const logoColor = isDark ? '#fff' : '#000';

  return (
    <>
      {!isAuthPage && (
        <AppBar
          position="fixed"
          elevation={1}
          color="default"
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            padding: '12px 15px',
          }}
          className="navbar-container"
        >
          <Toolbar className="navbar-toolbar">
            <Button onClick={() => navigate('/')} style={{ textTransform: 'none' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, color: logoColor }}>
                Verb
              </Typography>
            </Button>

            {isRoot && <SearchBar />}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <IconButton
                color="inherit"
                onClick={() => navigate('/')}
                className={getIconClass('/', isDark)}
              >
                <HomeIcon />
              </IconButton>

              {user && (
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/blog-post')}
                  className={getIconClass('/blog-post', isDark)}
                >
                  <PostAddIcon />
                </IconButton>
              )}

              <DropdownWithIcon onLogout={handleLogout} isDark={isDark} />

              <IconButton
                color="inherit"
                onClick={onToggleTheme}
                aria-label="toggle theme"
                className={'nav-icon'}
              >
                {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
