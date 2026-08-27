import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ReportTileContainer } from '../../components/ReportTileContainer/ReportTileContainer';
import { selectIsLoading } from '../../redux/user/userSelectors';

export const Home = () => {
  const isUserLoading = useSelector(selectIsLoading);

  if (isUserLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="home-container">
      <ReportTileContainer />
    </div>
  );
};
