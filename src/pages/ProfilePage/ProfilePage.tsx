import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';
import { BlogTileContainer } from '../../components/BlogTileContainer/BlogTileContainer';

const ProfilePage = () => {
  const theme = useTheme();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('This is my bio. I love coding and blogging.');

  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const onCoverUploadClick = () => coverInputRef.current?.click();
  const onProfileUploadClick = () => profileInputRef.current?.click();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, mb: 6 }}>
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
        {coverImage && (
          <Box
            component="img"
            src={coverImage}
            alt="Cover Image"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
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
          onClick={onCoverUploadClick}
          title="Edit Cover Image"
        >
          <EditIcon sx={{ position: 'absolute', right: 20, top: 20 }} />
        </Box>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={coverInputRef}
          onChange={(e) => handleImageChange(e, setCoverImage)}
        />
      </Box>
      {/* Profile picture container */}
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
        {profileImage && (
          <Box
            component="img"
            src={profileImage}
            alt="Profile Picture"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
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
          onClick={onProfileUploadClick}
          title="Edit Profile Picture"
        >
          <EditIcon sx={{ fontSize: 30 }} />
        </Box>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={profileInputRef}
          onChange={(e) => handleImageChange(e, setProfileImage)}
        />
      </Box>

      {/* Profile details */}
      <Box sx={{ px: 2, mb: 4 }}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          label="Bio"
          fullWidth
          multiline
          minRows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" mb={2}>
          Your Blogs
        </Typography>
        <BlogTileContainer />
      </Box>
    </Box>
  );
};

export default ProfilePage;
