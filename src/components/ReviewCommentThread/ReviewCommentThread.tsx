import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReviewerComment } from '../../app/interface/report';
import { ReportActions } from '../../redux/report/reportActions';
import { selectUser } from '../../redux/user/userSelectors';
import { utcToDmy } from '../../app/utils/dateUtcToDmy';

interface Props {
  comments: IReviewerComment[] | undefined;
  reportId?: string;
  isSidebar?: boolean;
}

export const ReviewerCommentThread = ({ comments, reportId, isSidebar = false }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyDraft, setReplyDraft] = useState('');

  if (!comments || comments.length === 0) return null;

  const handleReplySubmit = (commentId: string) => {
    if (!reportId || !replyDraft.trim()) return;

    dispatch(
      ReportActions.replyToComment({
        id: reportId,
        commentId,
        text: replyDraft.trim(),
      })
    );

    setReplyDraft('');
    setReplyingTo(null);
  };

  return (
    <Box
      sx={{
        mt: isSidebar ? 0 : 4,
        p: isSidebar ? 2 : 0,
        border: isSidebar ? '1px solid' : 'none',
        borderColor: isSidebar ? 'divider' : 'transparent',
        borderRadius: isSidebar ? 3 : 0,
        bgcolor: isSidebar ? 'background.paper' : 'transparent',
      }}
    >
      <Typography variant={isSidebar ? 'h6' : 'subtitle1'} fontWeight={700} sx={{ mb: 2 }}>
        Discussion stream
      </Typography>
      <Stack spacing={2.5}>
        {comments.map((comment) => {
          const text = comment.text ?? comment.comment ?? '';
          const replies = comment.replies ?? [];
          const canReply = !!user && !!reportId && user.id !== comment.authorId;

          return (
            <Box key={comment.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
              <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                {comment.authorName?.[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 1.5,
                    bgcolor: 'background.default',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="body2" fontWeight={700}>
                      {comment.authorName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {utcToDmy(new Date(comment.createdAt))}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                  </Typography>
                </Box>

                {replies.length > 0 && (
                  <Stack spacing={1.25} sx={{ mt: 1.5, ml: 1.5 }}>
                    {replies.map((reply) => (
                      <Box
                        key={reply.id}
                        sx={{
                          borderLeft: '2px solid',
                          borderColor: 'primary.main',
                          pl: 1.5,
                          py: 0.5,
                        }}
                      >
                        <Typography variant="caption" fontWeight={700}>
                          {reply.authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                          {utcToDmy(new Date(reply.createdAt))}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {reply.text}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}

                {canReply && (
                  <Box sx={{ mt: 1.25, ml: 0.5 }}>
                    {replyingTo === comment.id ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          value={replyDraft}
                          onChange={(e) => setReplyDraft(e.target.value)}
                          placeholder="Write a reply"
                          multiline
                          minRows={2}
                        />
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            size="small"
                            disabled={!replyDraft.trim()}
                            onClick={() => handleReplySubmit(comment.id)}
                          >
                            Send reply
                          </Button>
                          <Button variant="text" size="small" onClick={() => setReplyingTo(null)}>
                            Cancel
                          </Button>
                        </Stack>
                      </Box>
                    ) : (
                      <Button variant="text" size="small" onClick={() => setReplyingTo(comment.id)}>
                        Reply
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};
