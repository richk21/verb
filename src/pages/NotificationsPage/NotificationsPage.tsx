import { Box, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { INotification } from '../../app/interface/notification';
import { monoFontStack } from '../../app/theme';
import { NotificationActions } from '../../redux/notification/notificationActions';
import {
  selectNotifications,
  selectNotificationsLoading,
} from '../../redux/notification/notificationSelectors';

const typeLabel: Record<string, string> = {
  review_assigned: 'Review requested',
  report_approved: 'Approved',
  changes_requested: 'Changes requested',
  report_published: 'Published',
  role_changed: 'Role updated',
};

export function NotificationsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectNotifications);
  const isLoading = useSelector(selectNotificationsLoading);

  const handleClick = (n: INotification) => {
    console.log('Notification clicked:', n);
    if (!n.read) dispatch(NotificationActions.markAsRead({ id: n.id }));
    navigate(n.link);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', mt: 6, px: 2 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Notifications
      </Typography>

      {!isLoading && notifications.length === 0 && (
        <Typography color="text.secondary">You&apos;re all caught up.</Typography>
      )}

      <Box sx={{ border: '1px solid', borderColor: 'divider' }}>
        {notifications.map((n, i) => (
          <Box key={n.id}>
            <Box
              onClick={() => handleClick(n)}
              sx={{
                zIndex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                p: 2,
                cursor: 'pointer',
                bgcolor: n.read ? 'transparent' : 'action.hover',
                '&:hover': { bgcolor: 'action.selected' },
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: monoFontStack, color: 'primary.main', fontWeight: 600 }}
                >
                  {typeLabel[n.type] || n.type}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {n.message}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontFamily: monoFontStack, whiteSpace: 'nowrap', ml: 2 }}
              >
                {new Date(n.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            {i < notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
