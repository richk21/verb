import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { selectBlog } from '../../redux/blog/blogSelectors';

export const PreviewBlog = () => {
  const theme = useTheme();
  const blog = useSelector(selectBlog);

  const [coverImage, setCoverImage] = useState<string | null>('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (blog) {
      setCoverImage(blog.coverImage);
      setTitle(blog.title);
      setHashtags(blog.hashtags);
      setMarkdownContent(blog.content);
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
            mb: 3,
          }}
        />
      )}

      <Typography variant="h3" fontWeight={700} gutterBottom>
        {title}
      </Typography>

      <Stack direction="row" spacing={1} mb={3}>
        {hashtags.map((tag) => (
          <Chip key={tag} label={`#${tag}`} />
        ))}
      </Stack>

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
