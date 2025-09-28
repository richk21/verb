import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Button, IconButton, InputBase, Toolbar, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../../assets/logos/verb-transparent-black.png';
import logoWhite from '../../assets/logos/verb-transparent-white.png';
import { selectUser } from '../../redux/user/userSelectors';
import { resetAuthToken, resetUser } from '../../redux/user/userSlice';
import { DropdownWithIcon } from '../DropdownWithIcon/ProfileMenuButton';
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useTheme();
  console.log('User in Navbar:', user);
  const handleLogout = () => {
    Cookies.remove('authToken');
    dispatch(resetUser());
    dispatch(resetAuthToken());
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{ boxShadow: '0 0 8px rgba(0,0,0,0.2)', padding: '15px' }}
      className="navbar-container"
    >
      <Toolbar className="navbar-toolbar">
        <Button onClick={() => navigate('/')} style={{ textTransform: 'none' }}>
          <img className="verb-logo" src={isDark ? logoWhite : logoBlack} />
        </Button>

        <Box
          sx={{
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: 2,
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            px: 1,
          }}
        >
          <SearchIcon sx={{ color: 'primary', mr: 1 }} />
          <InputBase
            placeholder="Search blogs"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: 'inherit', width: '100%' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            className={getIconClass('/', isDark)}
          >
            <HomeIcon />
          </IconButton>

          <DropdownWithIcon onLogout={handleLogout} isDark={isDark} />

          {user && (
            <IconButton
              color="inherit"
              onClick={() => navigate('/blog-post')}
              className={getIconClass('/blog-post', isDark)}
            >
              <PostAddIcon />
            </IconButton>
          )}

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
  );
}
