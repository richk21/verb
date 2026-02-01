import { Box, Skeleton, Stack } from '@mui/material';

export const BlogTileSkeleton = () => {
  return (
    <Box sx={{ width: 320 }}>
      <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />

      <Stack spacing={1} mt={2}>
        <Skeleton variant="text" height={30} width="80%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="text" height={20} width="90%" />
        <Skeleton variant="text" height={20} width="70%" />
      </Stack>
    </Box>
  );
};
