import { all } from 'redux-saga/effects';
import { reportSaga } from './report/reportSaga';
import { notificationSaga } from './notification/notificationSaga';
import rootSaga from './rootSaga';
import { userSaga } from './user/userSaga';

describe('rootSaga', () => {
  it('includes the notification watcher', () => {
    const iterator = rootSaga();

    expect(iterator.next().value).toEqual(all([userSaga(), reportSaga(), notificationSaga()]));
  });
});
