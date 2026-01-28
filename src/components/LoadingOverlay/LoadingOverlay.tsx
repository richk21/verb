// LoadingOverlay.tsx
import { Box, CircularProgress } from '@mui/material';

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
