import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { BlogTileContainer } from '../../components/BlogTileContainer/BlogTileContainer';
import { selectIsLoading } from '../../redux/user/userSelectors';

export const Home = () => {
  const isUserLoading = useSelector(selectIsLoading);

  if (isUserLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="home-container">
      <BlogTileContainer />
    </div>
  );
};
