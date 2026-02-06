import { useParams } from 'react-router-dom';

export const useUserIdFromRoute = () => {
  const { userId } = useParams<{ userId: string }>();
  return userId;
};