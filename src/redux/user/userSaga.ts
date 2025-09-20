import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, setUserEmail } from './userSlice';

function* loginUser() {
  yield put(setLoading(true));
  const data: string = yield call(() =>
    Promise.resolve("hello@bp.com")
  );
  yield put(setUserEmail(data));
  yield put(setLoading(false));
}

export function* userSaga() {
  yield takeLatest('example/fetchDataRequest', loginUser);
}
