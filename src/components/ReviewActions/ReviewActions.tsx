import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReport } from '../../app/interface/report';
import { ReportActions } from '../../redux/report/reportActions';
import { selectUser } from '../../redux/user/userSelectors';
import { RequestChangesDialog } from '../RequestChangesDialog/RequestChangesDialog';

interface Props {
  report: IReport;
}

export const ReviewActions = ({ report }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  if (!user) return null;

  const isAuthor = user.id === report.authorId;
  const isReviewerOrAdmin = user.role === 'reviewer' || user.role === 'admin';

  const canSubmitForReview = isAuthor && report.status === 'draft';
  const canReview = isReviewerOrAdmin && report.status === 'under_review';
  const canPublish = isReviewerOrAdmin && report.status === 'approved';

  if (!canSubmitForReview && !canReview && !canPublish) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
      {canSubmitForReview && (
        <Button
          variant="contained"
          onClick={() => dispatch(ReportActions.submitForReview({ id: report.id }))}
        >
          Submit for review
        </Button>
      )}

      {canReview && (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => dispatch(ReportActions.approveReport({ id: report.id }))}
          >
            Approve
          </Button>
          <Button variant="outlined" color="warning" onClick={() => setRejectDialogOpen(true)}>
            Request changes
          </Button>
        </>
      )}

      {canPublish && (
        <Button
          variant="contained"
          color="success"
          onClick={() => dispatch(ReportActions.publishReportFinal({ id: report.id }))}
        >
          Publish
        </Button>
      )}

      <RequestChangesDialog
        open={rejectDialogOpen}
        onClose={() => setRejectDialogOpen(false)}
        onSubmit={(comment) => dispatch(ReportActions.requestChanges({ id: report.id, comment }))}
      />
    </Box>
  );
};
