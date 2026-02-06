import NoImageIcon from '@mui/icons-material/Image';
import AvatarIcon from '@mui/icons-material/Person';
import { Box, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUserIdFromRoute } from '../../app/hooks/useUserId';
import { IUser } from '../../app/interface/user';
import { UserActions } from '../../redux/user/userActions';

interface IViewableProfileSectionProps {
  user: IUser | null;
}
export const ViewableProfileSection = ({ user }: IViewableProfileSectionProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useUserIdFromRoute();
  /* const user = useSelector(selectViewableUserProfile); */

  console.log('component', user);
  useEffect(() => {
    dispatch(UserActions.GetViewableUserProfile(userId!));
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3.5, mb: 6 }}>
      <Box
        sx={{
          position: 'relative',
          height: 200,
          bgcolor: theme.palette.grey[600],
          borderRadius: 2,
          overflow: 'hidden',
          mb: 8,
          boxShadow: theme.shadows[4],
        }}
      >
        {user?.coverImage ? (
          <Box
            component="img"
            src={user?.coverImage}
            alt="Cover Image"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: theme.palette.grey[500],
            }}
          >
            <NoImageIcon sx={{ fontSize: 50, color: theme.palette.grey[300], mb: 5 }} />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: theme.palette.grey[500],
          overflow: 'hidden',
          mb: 3,
          mt: -20,
          ml: 3,
          boxShadow: theme.shadows[4],
        }}
      >
        {user?.profileImage ? (
          <Box
            component="img"
            src={user?.profileImage}
            alt="Profile Picture"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: theme.palette.grey[500],
            }}
          >
            <AvatarIcon sx={{ fontSize: 100, color: theme.palette.grey[300] }} />
          </Box>
        )}
      </Box>
      <Box sx={{ px: 2, mb: 4, ml: 8 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>{user?.name || 'User'}</Typography>
        <Typography sx={{ fontSize: 16, mt: 2, color: theme.palette.grey[400] }}>
          {user?.bio || ''}
        </Typography>
      </Box>
    </Box>
  );
};
