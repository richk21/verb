import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { Notification } from '../../components/Notification/Notification';
import { ProfilePaginatedBlogsContainer } from '../../components/ProfilePaginatedBlogsContainer/ProfilePaginatedBlogsContainer';
import {
  selectIsLoading,
  selectUser,
  selectUserSuccessMessage,
  selectViewableUserProfile,
} from '../../redux/user/userSelectors';
import { setSuccessMessage } from '../../redux/user/userSlice';
import { ProfileSection } from './ProfileSection';
import { ViewableProfileSection } from './ViewableProfileSection';

interface IProfilePageProps {
  isViewMode?: boolean;
}

const ProfilePage = ({ isViewMode }: IProfilePageProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const successMessage = useSelector(selectUserSuccessMessage);
  const user = isViewMode ? useSelector(selectViewableUserProfile) : useSelector(selectUser);
  const name = `${user?.name ? user?.name.split(' ')[0].charAt(0).toUpperCase() + user?.name.split(' ')[0].slice(1) + "'s" : ''}`;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {isViewMode ? <ViewableProfileSection user={user} /> : <ProfileSection user={user} />}
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" mb={2}>
          {name} Blogs
        </Typography>
        <ProfilePaginatedBlogsContainer />
      </Box>
      {successMessage && (
        <Notification
          onClear={() => dispatch(setSuccessMessage(null))}
          alertMessage={successMessage}
          type="success"
        />
      )}
    </>
  );
};

export default ProfilePage;
