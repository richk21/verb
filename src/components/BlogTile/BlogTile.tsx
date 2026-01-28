import EditIcon from '@mui/icons-material/Edit';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../app/utils/formatDate';
import { BlogActions } from '../../redux/blog/blogActions';

interface BlogTileProps {
  id: string;
  title: string;
  hashtags: string[];
  content: string;
  coverImageUrl: string;
  author: string;
  datePublished: string;
  isDraft?: boolean;
  isProfilePage?: boolean;
}

export function BlogTile({
  id,
  title,
  hashtags,
  content,
  coverImageUrl,
  author,
  datePublished,
  isDraft = false,
  isProfilePage = false,
}: BlogTileProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onEditIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    dispatch(BlogActions.getBlogById({ blogId: id }));
    navigate(`../blog-edit/${id}`);
  };

  const onBlogTitleClick = () => {
    dispatch(BlogActions.getBlogById({ blogId: id }));
    navigate(`../blog/${id}`);
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const removeMarkdown = (text: string) => {
    return text
      .replace(/[#*`~>!\\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  };
  const cleanContent = removeMarkdown(content);
  const contentExcerpt = cleanContent.length > 200 ? cleanContent.slice(0, 200) + '...' : content;
  const date = formatDate(datePublished);

  return (
    <Card
      sx={{
        width: 850,
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {coverImageUrl && (
        <CardMedia
          component="img"
          image={coverImageUrl}
          alt={title}
          sx={{
            height: 250,
            objectFit: 'cover',
            width: '100%',
            display: 'block',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
            onClick={onBlogTitleClick}
            sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
          >
            {title}
          </Typography>
          <Stack
            direction="row"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            mb={1}
          >
            {isProfilePage && (
              <>
                <Typography
                  style={{
                    borderRadius: '15px',
                    color: theme.palette.primary.main,
                    background: theme.palette.text.secondary,
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    display: 'inline-block',
                    marginBottom: '8px',
                  }}
                >
                  {isDraft ? 'Draft' : 'Published'}
                </Typography>

                <EditIcon
                  onClick={onEditIconClick}
                  sx={{
                    color: 'white',
                    mr: 1,
                    ml: 2,
                    mb: 1,
                    height: 30,
                    width: 30,
                    borderRadius: '50%',
                    background: theme.palette.text.secondary,
                    p: 1,
                    cursor: 'pointer',
                  }}
                />
              </>
            )}
          </Stack>
        </Stack>

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
            {author} - {date}
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
