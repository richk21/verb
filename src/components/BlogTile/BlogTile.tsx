import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

interface BlogTileProps {
  title: string;
  hashtags: string[]; // array of hashtag strings without '#'
  content: string;
  coverImageUrl: string;
  author: string;
  datePublished: string; // formatted date string
}

export function BlogTile({
  title,
  hashtags,
  content,
  coverImageUrl,
  author,
  datePublished,
}: BlogTileProps) {
  const theme = useTheme();

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const contentExcerpt = content.length > 200 ? content.slice(0, 400) + '...' : content;

  return (
    <Card
      sx={{
        maxWidth: 700,
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="img"
        image={coverImageUrl}
        alt={title}
        sx={{
          height: 250,
          objectFit: 'cover',
          width: '100%', // make sure it fills card horizontally
          display: 'block',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Box>
            {hashtags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                sx={{
                  mr: 0.5,
                  bgcolor: getRandomColor(),
                  color: '#fff',
                }}
              />
            ))}
          </Box>
          <Box
            sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: theme.palette.text.secondary }}
          >
            {author} - {datePublished}
          </Box>
        </Stack>

        <Typography
          variant="body2"
          sx={{ lineHeight: 1.4, whiteSpace: 'pre-line', color: theme.palette.text.secondary }}
        >
          {contentExcerpt}
        </Typography>
      </CardContent>
    </Card>
  );
}
