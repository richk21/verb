import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications } from '../../redux/notification/notificationSelector';
import { removeNotification } from '../../redux/notification/notificationSlice';
import { Notification } from './Notification';

export function GlobalNotification() {
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);

  if (notifications.length === 0) {
    return null;
  }

  const notification = notifications[0];

  return (
    <Notification
      alertMessage={notification.message}
      type={notification.type}
      onClear={() => dispatch(removeNotification(notification.id))}
    />
  );
}
