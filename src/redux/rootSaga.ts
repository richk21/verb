import { all } from 'redux-saga/effects';
import { blogSaga } from './blog/blogSaga';
import { userSaga } from './user/userSaga';

export default function* rootSaga() {
  yield all([userSaga()]);
  yield all([blogSaga()]);
}
