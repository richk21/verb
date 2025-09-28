import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  InputBase,
  Stack,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUnsplashResponse } from '../../app/interface/unsplashResponse';
import { Notification } from '../../components/Notification/Notification';
import { setBlog } from '../../redux/blog/blogSlice';
import { UNSPLASH_API_URL } from '../../redux/endpoints';

export const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [unsplashImages, setUnsplashImages] = useState<IUnsplashResponse[]>([]);
  const [unsplashError, setUnsplashError] = useState<string>('');

  const fetchRandomImages = async (count: number = 50) => {
    try {
      const res = await axios.get(UNSPLASH_API_URL(count, title));
      return res.data;
    } catch (err) {
      setUnsplashError('Failed to fetch images from Unsplash');
    }
  };

  useEffect(() => {
    if (openDialog) {
      fetchRandomImages().then((images) => setUnsplashImages(images));
    }
  }, [openDialog]);

  const addHashtag = () => {
    const cleaned = hashtagInput.trim();
    if (cleaned && !hashtags.includes(cleaned)) {
      setHashtags((prev) => [...prev, cleaned]);
      setHashtagInput('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const selectCoverImage = (url: string) => {
    setCoverImage(url);
    setOpenDialog(false);
  };

  const handlePreviewClick = () => {
    dispatch(setBlog({ title, hashtags, coverImage, content: markdownContent }));
    navigate('/blog-preview');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        m: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          m: 3,
        }}
      >
        <Box
          tabIndex={0}
          role="button"
          sx={{
            border: '1px dashed',
            borderColor: theme.palette.grey[400],
            borderRadius: 2,
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: coverImage ? 'none' : theme.palette.background.paper,
            backgroundImage: coverImage ? `url(${coverImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: coverImage ? 'transparent' : theme.palette.text.secondary,
            fontWeight: 'bold',
            fontSize: 18,
            mb: 3,
            '&:hover': {
              borderColor: theme.palette.grey[600],
            },
            outline: 'none',
          }}
          onClick={() => setOpenDialog(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setOpenDialog(true);
          }}
        >
          {!coverImage && (
            <div
              style={{
                color: '#C4C4C4',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <ImageIcon />
              Cover Image
            </div>
          )}
        </Box>

        <InputBase
          placeholder="Blog Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            borderBottom: '1px solid',
            borderColor: theme.palette.divider,
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            fontSize: 24,
            fontWeight: 600,
            px: 1,
            py: 0.5,
            mb: 3,
            '&:focus': {
              borderColor: theme.palette.primary.main,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[800]
                  : theme.palette.background.paper,
            },
          }}
        />

        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {hashtags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => removeHashtag(tag)}
                sx={{ bgcolor: theme.palette.grey[500], color: 'white' }}
              />
            ))}
          </Stack>
          <InputBase
            placeholder="Add hashtag and press Enter"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addHashtag();
              }
            }}
            fullWidth
            sx={{
              borderBottom: '1px solid',
              borderColor: theme.palette.divider,
              backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
              px: 1,
              py: 0.5,
            }}
          />
        </Box>

        <InputBase
          placeholder="Write your blog content in markdown..."
          multiline
          minRows={10}
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          fullWidth
          sx={{
            fontFamily: 'Monospace, monospace',
            fontSize: 16,
            bgcolor:
              theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            borderRadius: 1,
            p: 2,
            mb: 3,
            border: '1px solid',
            borderColor: theme.palette.divider,
            whiteSpace: 'pre-wrap',
          }}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={({ palette }) => ({
              textTransform: 'none',
              borderColor: palette.primary.contrastText,
              color: palette.primary.contrastText,
              '&:hover': {
                backgroundColor: palette.primary.contrastText,
                color: palette.primary.main,
              },
            })}
            onClick={() => {
              handlePreviewClick();
            }}
          >
            Preview
          </Button>

          <Button
            variant="outlined"
            sx={({ palette }) => ({
              textTransform: 'none',
              borderColor: palette.primary.contrastText,
              color: palette.primary.contrastText,
              '&:hover': {
                backgroundColor: palette.primary.contrastText,
                color: palette.primary.main,
              },
            })}
          >
            Save as Draft
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={({ palette }) => ({
              textTransform: 'none',
              backgroundColor: palette.primary.contrastText,
              color: palette.primary.main,
              '&:hover': {
                backgroundColor: palette.primary.contrastText,
                color: palette.primary.main,
              },
            })}
          >
            Publish
          </Button>
        </Stack>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
          <DialogTitle>Select Cover Image</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 1,
              }}
            >
              {unsplashImages?.map((img: IUnsplashResponse) => (
                <Box
                  key={img.id}
                  component="img"
                  src={img.urls.small}
                  alt={img.alt_description || 'unsplash image'}
                  sx={{
                    width: '100%',
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={() => selectCoverImage(img.urls.regular)}
                />
              ))}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      {unsplashError && <Notification alertMessage={unsplashError} type="error" />}
    </Box>
  );
};
