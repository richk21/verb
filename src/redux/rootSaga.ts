import { all } from 'redux-saga/effects';
import { notificationSaga } from './notification/notificationSaga';
import { orgMembersSaga } from './orgMembers/orgMembersSaga';
import { reportSaga } from './report/reportSaga';
import { userSaga } from './user/userSaga';

export default function* rootSaga() {
  yield all([userSaga(), reportSaga(), notificationSaga(), orgMembersSaga()]);
}
