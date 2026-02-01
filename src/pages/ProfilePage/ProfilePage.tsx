import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { Notification } from '../../components/Notification/Notification';
import { ProfilePaginatedBlogsContainer } from '../../components/ProfilePaginatedBlogsContainer/ProfilePaginatedBlogsContainer';
import { selectIsLoading, selectUserSuccessMessage } from '../../redux/user/userSelectors';
import { setSuccessMessage } from '../../redux/user/userSlice';
import { ProfileSection } from './ProfileSection';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const successMessage = useSelector(selectUserSuccessMessage);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <ProfileSection />
      <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" mb={2}>
          Your Blogs
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
