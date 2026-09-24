import { createAction } from '@reduxjs/toolkit';
import { types } from '../../app/actionTypes';
import { IChangeRoleRequest } from '../../app/interface/orgMemberRequest';

export class OrgMembersActions {
  static getAllMembers = createAction(types.GET_ALL_ORG_MEMBERS);
  static changeRole = createAction<IChangeRoleRequest>(types.CHANGE_USER_ROLE);
}
