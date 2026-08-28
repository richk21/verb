import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export const RequestChangesDialog = ({ open, onClose, onSubmit }: Props) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment.trim());
    setComment('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          p: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Request changes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Explain what needs to change before this report can be approved. This sends it back to the
          author as a draft.
        </Typography>
        <TextField
          multiline
          minRows={3}
          fullWidth
          autoFocus
          placeholder="e.g. Add the root cause section and confirm the timeline timestamps."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!comment.trim()} onClick={handleSubmit}>
            Send back for changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
