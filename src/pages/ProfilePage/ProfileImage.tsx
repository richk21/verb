import EditIcon from '@mui/icons-material/Edit';
import AvatarIcon from '@mui/icons-material/Person';
import { Box, useTheme } from '@mui/material';
import { ChangeEvent, useRef } from 'react';

interface ProfileImageProps {
  profileImage: string | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileSelected: (file: File) => void;
}

export const ProfileImage = ({
  profileImage,
  handleImageChange,
  onFileSelected,
}: ProfileImageProps) => {
  const theme = useTheme();
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 250,
        height: 250,
        borderRadius: '50%',
        bgcolor: theme.palette.grey[500],
        overflow: 'hidden',
        mx: 'auto',
        mb: 3,
        mt: -30,
        boxShadow: theme.shadows[4],
      }}
    >
      {profileImage ? (
        <Box
          component="img"
          src={profileImage}
          alt="Profile Picture"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: theme.palette.grey[500],
          }}
        >
          <AvatarIcon sx={{ fontSize: 100, color: theme.palette.grey[300] }} />
        </Box>
      )}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.4)',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          cursor: 'pointer',
          transition: 'opacity 0.3s',
          '&:hover': { opacity: 1 },
        }}
        onClick={() => profileInputRef.current?.click()}
        title="Edit Profile Picture"
      >
        <EditIcon sx={{ fontSize: 30 }} />
      </Box>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={profileInputRef}
        onChange={handleOnChange}
      />
    </Box>
  );
};
