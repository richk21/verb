import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { utcToDmy } from '../../app/utils/dateUtcToDmy';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { BlogActions } from '../../redux/blog/blogActions';
import { selectBlog } from '../../redux/blog/blogSelectors';

export const BlogView = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id || '';
  const theme = useTheme();
  const blog = useSelector(selectBlog);

  useEffect(() => {
    if (blogId) {
      dispatch(BlogActions.getBlogById({ blogId }));
    }
  }, [dispatch, blogId]);

  if (!blog) return <LoadingOverlay />;

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
        {blog?.coverImage && (
          <Box
            sx={{
              width: '100%',
              height: 300,
              bgcolor: theme.palette.grey[200],
              backgroundImage: `url(${blog?.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
            }}
          />
        )}
      </Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {blog?.title}
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
          {blog?.hashtags?.map((tag) => (
            <Chip key={tag} label={`#${tag}`} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} mb={3} mr={2}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
              ml: 2,
              minWidth: 160,
            }}
          >
            {blog?.authorName && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.3,
                }}
              >
                By {blog?.authorName}
              </span>
            )}
            {blog?.createdAt && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontSize: 13,
                }}
              >
                {utcToDmy(new Date(blog?.createdAt || ''))}
              </span>
            )}
          </Box>
          <Box
            component="img"
            src={blog?.authorAvatar}
            alt="Author Avatar"
            sx={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
          />
        </Stack>
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
        <ReactMarkdown>{blog?.content}</ReactMarkdown>
      </Box>
    </Box>
  );
};
