import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { ProfilePaginatedReportsContainer } from '../../components/ProfilePaginatedReportsContainer/ProfilePaginatedReportsContainer';
import {
  selectIsLoading,
  selectUser,
  selectViewableUserProfile,
} from '../../redux/user/userSelectors';
import { ProfileSection } from './ProfileSection';
import { ViewableProfileSection } from './ViewableProfileSection';

interface IProfilePageProps {
  isViewMode?: boolean;
}

const ProfilePage = ({ isViewMode }: IProfilePageProps) => {
  const isLoading = useSelector(selectIsLoading);
  const user = isViewMode ? useSelector(selectViewableUserProfile) : useSelector(selectUser);
  const name = `${user?.name ? user?.name.split(' ')[0].charAt(0).toUpperCase() + user?.name.split(' ')[0].slice(1) + "'s" : ''}`;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      {isViewMode ? <ViewableProfileSection user={user} /> : <ProfileSection user={user} />}
      <Box sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" mb={2}>
          {name} Reports
        </Typography>
        <ProfilePaginatedReportsContainer />
      </Box>
    </>
  );
};

export default ProfilePage;
