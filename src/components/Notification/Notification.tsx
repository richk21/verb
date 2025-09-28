import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';

interface IAlertProps {
  alertMessage: string;
  type: 'error' | 'success' | 'info' | 'warning';
}

export function Notification({ alertMessage, type }: IAlertProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertMessage) setOpen(true);
  }, [alertMessage]);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
