import { ArrowBack } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectBlog } from '../../redux/blog/blogSelectors';
import { resetBlog } from '../../redux/blog/blogSlice';

export const BlogView = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id || '';
  const theme = useTheme();
  const blog = useSelector(selectBlog);
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState<string | null>('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState('');
  const [user, setUser] = useState('');
  const [date, setDate] = useState('');
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (blogId) {
      setIsViewMode(true);
      dispatch(BlogActions.getBlogById({ blogId }));
    }
  }, [dispatch, blogId]);

  useEffect(() => {
    return () => {
      dispatch(resetBlog());
    };
  }, [dispatch]);

  useEffect(() => {
    if (blog) {
      setCoverImage(blog.coverImage);
      setTitle(blog.title);
      setHashtags(blog.hashtags);
      setMarkdownContent(blog.content);
      setUser(blog.authorName);
      setDate(blog.createdAt);
    }
  }, [blog, setCoverImage, setTitle, setHashtags, setMarkdownContent]);

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: 'auto',
        p: 3,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', pt: 3, mb: 1 }}>
        {!isViewMode && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              left: -80,
              zIndex: 2,
              background: 'rgba(255,255,255,0.7)',
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack sx={{ fontSize: 28 }} />
          </IconButton>
        )}

        {blog?.coverImage && (
          <Box
            sx={{
              width: '100%',
              height: 300,
              bgcolor: theme.palette.grey[200],
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
            }}
          />
        )}
      </Box>

      <Typography variant="h3" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1} mb={3}>
          {hashtags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} />
          ))}
        </Stack>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            ml: 2,
            minWidth: 160,
          }}
        >
          {user && (
            <span
              style={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1.3,
              }}
            >
              By {user}
            </span>
          )}
          {date && (
            <span
              style={{
                color: theme.palette.text.secondary,
                fontSize: 13,
              }}
            >
              {date}
            </span>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          fontSize: 18,
          lineHeight: 1.6,
          '& img': {
            maxWidth: '100%',
            borderRadius: 4,
            marginTop: 12,
            marginBottom: 12,
          },
          '& pre': {
            backgroundColor: theme.palette.grey[900],
            color: '#fff',
            padding: 16,
            borderRadius: 4,
            overflowX: 'auto',
          },
        }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </Box>
    </Box>
  );
};
