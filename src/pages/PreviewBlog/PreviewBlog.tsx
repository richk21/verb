import { ArrowBack } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Typography, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { utcToDmy } from '../../app/utils/dateUtcToDmy';

interface IPreviewBlog {
  title?: string;
  content?: string;
  hashtags?: string[];
  coverImage?: string | null;
  authorName?: string;
  createdAt?: Date | null;
  onBackButtonClick?: () => void;
  userAvatar?: string;
}

export const PreviewBlog = ({
  title = '',
  content = '',
  hashtags = [],
  coverImage = '',
  authorName = '',
  createdAt = null,
  userAvatar = '',
  onBackButtonClick,
}: IPreviewBlog) => {
  const theme = useTheme();

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
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            left: -80,
            zIndex: 2,
            background: 'rgba(255,255,255,0.7)',
          }}
          onClick={() => onBackButtonClick && onBackButtonClick()}
        >
          <ArrowBack sx={{ fontSize: 28 }} />
        </IconButton>

        {coverImage && (
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
          {hashtags?.map((tag) => (
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
            {authorName && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.3,
                }}
              >
                By {authorName}
              </span>
            )}
            {createdAt && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontSize: 13,
                }}
              >
                {utcToDmy(createdAt)}
              </span>
            )}
          </Box>
          <Box
            component="img"
            src={userAvatar}
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
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </Box>
  );
};
