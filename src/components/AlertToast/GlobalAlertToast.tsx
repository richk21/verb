import { useDispatch, useSelector } from 'react-redux';
import { selectAlertToasts } from '../../redux/alertToast/alertToastSelector';
import { removeAlertToast } from '../../redux/alertToast/alertToastSlice';
import { AlertToast } from './AlertToast';

export function GlobalAlertToast() {
  const dispatch = useDispatch();

  const alerts = useSelector(selectAlertToasts);

  if (alerts.length === 0) {
    return null;
  }

  const notification = alerts[0];

  return (
    <AlertToast
      alertMessage={notification.message}
      type={notification.type}
      onClear={() => dispatch(removeAlertToast(notification.id))}
    />
  );
}
