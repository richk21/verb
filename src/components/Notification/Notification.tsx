import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

interface IAlertProps {
  alertMessage: string | null;
  type: 'error' | 'success' | 'info' | 'warning';
  onClear: () => void;
}

export function Notification({ alertMessage, type, onClear }: IAlertProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      setOpen(true);
    }
  }, [alertMessage]);

  const handleClose = (_event?: Event | SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    onClear();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
