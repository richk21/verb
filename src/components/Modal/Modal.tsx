import { Box, Button, Modal, Typography } from '@mui/material';

interface IModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onSubmit: () => void;
  submitLabel?: string;
}

export const WarningModal = ({
  open,
  onClose,
  title,
  message,
  onSubmit,
  submitLabel = 'Confirm',
}: IModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 3,
          boxShadow: 24,
          width: '40%',
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            {submitLabel}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
