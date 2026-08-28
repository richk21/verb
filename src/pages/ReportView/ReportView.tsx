import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { utcToDmy } from '../../app/utils/dateUtcToDmy';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { ReviewActions } from '../../components/ReviewActions/ReviewActions';
import { ReviewerCommentThread } from '../../components/ReviewCommentThread/ReviewCommentThread';
import { ReviewStatusStepper } from '../../components/ReviewStatusStepper/ReviewStatusStepper';
import { ReportActions } from '../../redux/report/reportActions';
import { selectReport } from '../../redux/report/reportSelectors';

export const ReportView = () => {
  const dispatch = useDispatch();
  const reportId = useParams().id || '';
  const theme = useTheme();
  const report = useSelector(selectReport);

  useEffect(() => {
    if (reportId) {
      dispatch(ReportActions.getReportById({ reportId }));
    }
  }, [dispatch, reportId]);

  if (!report) return <LoadingOverlay />;

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
      <ReviewStatusStepper status={report.status} />
      <ReviewActions report={report} />
      <Box sx={{ position: 'relative', width: '100%', pt: 3, mb: 1 }}>
        {report?.coverImage && (
          <Box
            sx={{
              width: '100%',
              height: 300,
              bgcolor: theme.palette.grey[200],
              backgroundImage: `url(${report?.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 3,
            }}
          />
        )}
      </Box>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        {report?.title}
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
          {report?.hashtags?.map((tag) => (
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
            {report?.authorName && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1.3,
                }}
              >
                By{' '}
                <Link to={`/profile/${report?.authorId}`}>
                  <Typography
                    sx={{
                      display: 'inline',
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      fontSize: 15,
                      lineHeight: 1.3,
                      textDecoration: 'none',
                    }}
                  >
                    {report?.authorName}
                  </Typography>
                </Link>
              </span>
            )}
            {report?.createdAt && (
              <span
                style={{
                  color: theme.palette.text.secondary,
                  fontSize: 13,
                }}
              >
                {utcToDmy(new Date(report?.createdAt || ''))}
              </span>
            )}
          </Box>
          <Link to={`/profile/${report?.authorId}`}>
            <Box
              component="img"
              src={report?.authorAvatar}
              alt="Author Avatar"
              sx={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          </Link>
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
        <ReactMarkdown>{report?.content}</ReactMarkdown>
      </Box>
      <ReviewerCommentThread comments={report.reviewerComment} />
    </Box>
  );
};
