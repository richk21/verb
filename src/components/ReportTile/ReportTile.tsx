import TrashIcon from '@mui/icons-material/Delete';
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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../app/utils/formatDate';
import { ReportActions } from '../../redux/report/reportActions';
import { WarningModal } from '../Modal/Modal';

interface ReportTileProps {
  id: string;
  title: string;
  hashtags: string[];
  content: string;
  coverImageUrl: string;
  author: string;
  datePublished: string;
  isDraft?: boolean;
  isProfilePage?: boolean;
  userId: string;
  userAvatar: string;
}

export function ReportTile({
  id,
  title,
  hashtags,
  content,
  coverImageUrl,
  author,
  datePublished,
  isDraft = false,
  isProfilePage = false,
  userId,
  userAvatar,
}: ReportTileProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onEditIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    dispatch(ReportActions.getCurrentReportById({ reportId: id }));
    navigate(`../edit-report/${id}`);
  };

  const onDeleteIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
  };

  const handleDelete = () => {
    dispatch(ReportActions.reportDelete({ reportId: id, userId }));
  };

  const onReportTitleClick = () => {
    dispatch(ReportActions.getReportById({ reportId: id }));
    navigate(`../report/${id}`);
  };

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
        width: '100%',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.15s ease',
        '&:hover': { borderColor: theme.palette.primary.main },
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
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
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
          <Stack
            direction="row"
            alignItems="top"
            spacing={2}
            display={'flex'}
            width={'100%'}
            justifyContent={'space-between'}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              gutterBottom
              onClick={onReportTitleClick}
              sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                fontSize: '0.85rem',
                color: theme.palette.text.secondary,
                minWidth: '100px',
                pt: 1,
              }}
            >
              {date}
            </Box>
          </Stack>
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
                    color: '#fff',
                    background: isDraft ? theme.palette.grey[500] : theme.palette.success.main,
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

                <TrashIcon
                  onClick={onDeleteIconClick}
                  sx={{
                    color: 'white',
                    mr: 1,
                    ml: 2,
                    mb: 1,
                    height: 30,
                    width: 30,
                    borderRadius: '50%',
                    background: theme.palette.error.light,
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
                variant="outlined"
                sx={{
                  mr: 0.5,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  bgcolor: 'transparent',
                }}
              />
            ))}
          </Box>
          <Stack direction="row" spacing={1} mb={3} sx={{ alignItems: 'center' }}>
            <Box
              component="img"
              src={userAvatar}
              alt="Author Avatar"
              sx={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <Box
              sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: theme.palette.text.secondary }}
            >
              {author} {/* - {date} */}
            </Box>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          sx={{ lineHeight: 1.4, whiteSpace: 'pre-line', color: theme.palette.text.secondary }}
        >
          {contentExcerpt}
        </Typography>
      </CardContent>
      {openDeleteModal && (
        <WarningModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title="Delete Incident Report"
          message="Are you sure you want to delete this incident report? This cannot be undone."
          onSubmit={handleDelete}
          submitLabel="Delete"
        />
      )}
    </Card>
  );
}
