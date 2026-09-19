import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IReport, ReportStatus } from '../../app/interface/report';
import { ReportActions } from '../../redux/report/reportActions';
import { selectUser } from '../../redux/user/userSelectors';
import { RequestChangesDialog } from '../RequestChangesDialog/RequestChangesDialog';
import { ReviewerSelectDialog } from '../ReviewerSelectDialog/ReviewerSelectDialog';

interface Props {
  report: IReport;
}

export const ReviewActions = ({ report }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [reviewerDialogOpen, setReviewerDialogOpen] = useState(false);

  if (!user) return null;

  const isAuthor = user.id === report.authorId;
  const isAssignedReviewer = report.reviewerId === user.id;

  const canSubmitForReview = isAuthor && report.status === ReportStatus.draft;
  const canReview = isAssignedReviewer && report.status === ReportStatus.under_review;
  const canPublish = isAssignedReviewer && report.status === ReportStatus.approved;

  if (!canSubmitForReview && !canReview && !canPublish) {
    if (report.status === ReportStatus.under_review && report.reviewerName) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Awaiting review from {report.reviewerName}.
        </Typography>
      );
    }

    return null;
  }

  return (
    <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
      {canSubmitForReview && (
        <Button variant="contained" onClick={() => setReviewerDialogOpen(true)}>
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
      <ReviewerSelectDialog
        open={reviewerDialogOpen}
        onClose={() => setReviewerDialogOpen(false)}
        onSubmit={(reviewerId) =>
          dispatch(ReportActions.submitForReview({ id: report.id, reviewerId }))
        }
      />
    </Box>
  );
};
