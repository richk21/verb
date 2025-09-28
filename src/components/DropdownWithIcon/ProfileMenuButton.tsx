import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../redux/user/userSelectors';
import { getIconClass } from '../Navbar/Navbar';

interface DropdownWithIconProps {
  onLogout: () => void;
  isDark: boolean;
}

export function DropdownWithIcon({ onLogout, isDark }: DropdownWithIconProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectUser);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    }
    navigate('/login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        className={getIconClass('/profile', isDark)}
      >
        <PersonIcon />
      </IconButton>
      {user && (
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
            sx: {
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              minWidth: 180,
              p: 1,
            },
          }}
          sx={{
            mt: 1,
            '.MuiMenuItem-root': {
              fontWeight: '500',
              color: 'text.primary',
              transition: 'background-color 0.3s ease',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'common.white',
              },
              '&.Mui-selected': {
                bgcolor: 'primary.dark',
                color: 'common.white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            },
          }}
        >
          <MenuItem onClick={goToProfile}>Profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      )}
    </>
  );
}
