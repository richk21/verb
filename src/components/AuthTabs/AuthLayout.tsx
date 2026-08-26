import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  variant?: 'centered' | 'split';
}

export const AuthLayout = ({ children, variant = 'centered' }: AuthLayoutProps) => {
  if (variant === 'centered') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          padding: '24px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 440,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            padding: '32px',
            boxShadow: '0px 2px 8px rgba(15,23,42,0.06)',
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex' }}>
      <Box
        sx={{
          flex: '0 0 50%',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          bgcolor: '#0B1120',
          color: '#F1F5F9',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1.5 }}>
          Verb
        </Typography>
        <Typography variant="body1" sx={{ color: '#94A3B8', maxWidth: 340 }}>
          Incident reporting and review, with an audit trail your compliance team can actually rely
          on.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          padding: '24px',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440, padding: '16px' }}>{children}</Box>
      </Box>
    </Box>
  );
};
