import { Autocomplete, Avatar, Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IOrgMember } from '../../app/interface/notification';
import { reportService } from '../../redux/report/reportService'; // or wherever GET_ORG_MEMBERS lives

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (reviewerId: string) => void;
}

export const ReviewerSelectDialog = ({ open, onClose, onSubmit }: Props) => {
  const [members, setMembers] = useState<IOrgMember[]>([]);
  const [selected, setSelected] = useState<IOrgMember | null>(null);

  useEffect(() => {
    if (open) {
      reportService.getOrgMembers().then((res) => setMembers(res.data.members));
    }
  }, [open]);

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit(selected.id);
    setSelected(null);
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
          borderRadius: 2,
          p: 4,
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Select a reviewer
        </Typography>
        <Autocomplete
          options={members}
          getOptionLabel={(m) => m.name}
          value={selected}
          onChange={(_e, val) => setSelected(val)}
          renderOption={(props, option) => (
            <Box component="li" {...props} sx={{ display: 'flex', gap: 1.5 }}>
              <Avatar src={option.profileImage} sx={{ width: 28, height: 28 }} />
              <Box>
                <Typography variant="body2">{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.role}
                </Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => <TextField {...params} placeholder="Search reviewers..." />}
          noOptionsText="No reviewers or admins in your organization yet"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!selected} onClick={handleSubmit}>
            Submit for review
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
