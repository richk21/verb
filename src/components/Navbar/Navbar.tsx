import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotificationActions } from '../../redux/notification/notificationActions';
import { selectUnreadCount } from '../../redux/notification/notificationSelectors';
import { selectUser } from '../../redux/user/userSelectors';
import { resetAuthToken, resetUser } from '../../redux/user/userSlice';
import { DropdownWithIcon } from '../DropdownWithIcon/ProfileMenuButton';
import { SearchBar } from '../SearchBar/SearchBar';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * Returns the sx object for a nav icon given whether it's the active route.
 * Replaces the old className-based (.light-active/.dark-inactive/...)
 * approach from navbar.scss with the same states expressed inline.
 */
export const getNavIconSx = (isActive: boolean, isDark: boolean) => {
  const activeColor = isDark ? '#5C7CFA' : '#3454D1';
  const activeBg = isDark ? 'rgba(92,124,250,0.16)' : 'rgba(52,84,209,0.08)';
  const inactiveColor = isDark ? '#94A3B8' : '#64748B';

  return {
    transition: 'all 0.15s ease',
    borderRadius: '6px',
    padding: '8px',
    color: isActive ? activeColor : inactiveColor,
    backgroundColor: isActive ? activeBg : 'transparent',
    '&:hover': {
      color: activeColor,
      backgroundColor: isDark ? 'rgba(92,124,250,0.10)' : 'rgba(52,84,209,0.06)',
    },
  };
};

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isRoot = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const user = useSelector(selectUser);
  const unreadCount = useSelector(selectUnreadCount);

  const handleLogout = () => {
    Cookies.remove('authToken');
    dispatch(resetUser());
    dispatch(resetAuthToken());
    navigate('../');
  };

  useEffect(() => {
    if (user) dispatch(NotificationActions.getUnreadCount());
  }, [user, dispatch, location.pathname]);

  const logoColor = isDark ? '#fff' : '#000';

  if (isAuthPage) return null;

  return (
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
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: '1 0 0',
          justifyContent: 'space-between',
        }}
      >
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
            sx={getNavIconSx(location.pathname === '/', isDark)}
          >
            <HomeIcon />
          </IconButton>

          {user && (
            <IconButton
              color="inherit"
              onClick={() => navigate('/post-report')}
              sx={getNavIconSx(location.pathname === '/post-report', isDark)}
            >
              <PostAddIcon />
            </IconButton>
          )}

          {user && (
            <IconButton
              color="inherit"
              onClick={() => navigate('/notifications')}
              sx={getNavIconSx(location.pathname === '/notifications', isDark)}
            >
              <Badge badgeContent={unreadCount} color="error" max={9}>
                <NotificationsOutlinedIcon />
              </Badge>
            </IconButton>
          )}

          <DropdownWithIcon
            onLogout={handleLogout}
            isDark={isDark}
            currentPath={location.pathname}
          />

          <IconButton
            color="inherit"
            onClick={onToggleTheme}
            aria-label="toggle theme"
            sx={getNavIconSx(false, isDark)}
          >
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
