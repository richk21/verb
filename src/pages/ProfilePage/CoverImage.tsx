import EditIcon from '@mui/icons-material/Edit';
import NoImageIcon from '@mui/icons-material/Image';
import { Box, useTheme } from '@mui/material';
import { ChangeEvent, useRef } from 'react';

interface CoverImageProps {
  coverImage: string | null;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileSelected: (file: File) => void;
}

export const CoverImage = ({ coverImage, handleImageChange, onFileSelected }: CoverImageProps) => {
  const theme = useTheme();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageChange(e);
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: 300,
        bgcolor: theme.palette.grey[600],
        borderRadius: 2,
        overflow: 'hidden',
        mb: 8,
        boxShadow: theme.shadows[4],
      }}
    >
      {coverImage ? (
        <Box
          component="img"
          src={coverImage}
          alt="Cover Image"
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
          <NoImageIcon sx={{ fontSize: 50, color: theme.palette.grey[300], mb: 20 }} />
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
          cursor: 'pointer',
          opacity: 0,
          transition: 'opacity 0.3s',
          '&:hover': { opacity: 1 },
          borderBottomLeftRadius: 8,
        }}
        onClick={() => coverInputRef.current?.click()}
        title="Edit Cover Image"
      >
        <EditIcon sx={{ position: 'absolute', right: 20, top: 20 }} />
      </Box>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={coverInputRef}
        onChange={handleOnChange}
      />
    </Box>
  );
};
