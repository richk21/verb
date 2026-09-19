import { RootState } from '../../app/store';

export const selectAlertToasts = (state: RootState) => state.alertToast.alertToasts;
