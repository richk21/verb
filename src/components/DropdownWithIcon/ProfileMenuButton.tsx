import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/user/userSelectors';
import { getNavIconSx } from '../Navbar/Navbar';

interface DropdownWithIconProps {
  onLogout: () => void;
  isDark: boolean;
  currentPath: string;
}

export function DropdownWithIcon({ onLogout, isDark, currentPath }: DropdownWithIconProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectUser);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login');
    }
  };

  const handleClose = () => setAnchorEl(null);

  const goToProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const logout = () => {
    handleClose();
    onLogout();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={getNavIconSx(currentPath === '/profile', isDark)}
      >
        <PersonIcon />
      </IconButton>
      {user && (
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 220,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0px 4px 16px rgba(15,23,42,0.10)',
              },
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{ display: 'block', px: 2, py: 1, color: 'text.secondary' }}
          >
            Signed in as
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ px: 2, pb: 1, wordBreak: 'break-word' }}
          >
            {user.email}
          </Typography>
          <Divider />
          <MenuItem onClick={goToProfile} sx={{ gap: 1.5, py: 1.25 }}>
            <PersonOutlineIcon fontSize="small" />
            Profile
          </MenuItem>
          <MenuItem onClick={logout} sx={{ gap: 1.5, py: 1.25 }}>
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
}
