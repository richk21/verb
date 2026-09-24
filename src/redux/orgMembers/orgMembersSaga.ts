import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { types } from '../../app/actionTypes';
import { IOrgMember } from '../../app/interface/notification';
import { IChangeRoleRequest } from '../../app/interface/orgMemberRequest';
import { ErrorResponse } from '../../app/interface/response/errorResponse';
import { orgMembersService } from './orgMembersService';
import {
  setMemberRoleInPlace,
  setMembers,
  setOrgMembersErrorMessage,
  setOrgMembersLoading,
  setOrgMembersSuccessMessage,
} from './orgMembersSlice';

export function* getAllMembers() {
  yield put(setOrgMembersLoading(true));
  try {
    const response: AxiosResponse<{ members: IOrgMember[] }> = yield call(
      orgMembersService.GetAllMembers
    );
    if (response.status === 200) {
      yield put(setMembers(response.data.members));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(
      setOrgMembersErrorMessage(err.response?.data.message || 'Failed to load organization members')
    );
  } finally {
    yield put(setOrgMembersLoading(false));
  }
}

export function* changeRole(action: { type: string; payload: IChangeRoleRequest }) {
  try {
    const response: AxiosResponse<{ id: string; role: string }> = yield call(
      orgMembersService.ChangeRole,
      action.payload
    );
    if (response.status === 200) {
      yield put(setMemberRoleInPlace(action.payload));
      yield put(setOrgMembersSuccessMessage('Role updated.'));
      yield put(setOrgMembersErrorMessage(null));
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;
    yield put(setOrgMembersErrorMessage(err.response?.data.message || 'Failed to update role'));
  }
}

export function* orgMembersSaga() {
  yield takeLatest(types.GET_ALL_ORG_MEMBERS, getAllMembers);
  yield takeLatest(types.CHANGE_USER_ROLE, changeRole);
}
