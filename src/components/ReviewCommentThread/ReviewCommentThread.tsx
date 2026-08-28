import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import { IReviewerComment } from '../../app/interface/report';
import { utcToDmy } from '../../app/utils/dateUtcToDmy';

interface Props {
  comments: IReviewerComment[] | undefined;
}

export const ReviewerCommentThread = ({ comments }: Props) => {
  if (!comments || comments.length === 0) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
        Reviewer comments
      </Typography>
      <Stack spacing={2}>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
              {comment.authorName?.[0]?.toUpperCase()}
            </Avatar>
            <Box
              sx={{
                flex: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={600}>
                  {comment.authorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {utcToDmy(new Date(comment.createdAt))}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {comment.comment}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};
