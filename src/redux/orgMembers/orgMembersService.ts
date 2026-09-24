import { IOrgMember } from '../../app/interface/notification';
import { IChangeRoleRequest } from '../../app/interface/orgMemberRequest';
import api from '../axiosInstance';
import { CHANGE_USER_ROLE, GET_ALL_ORG_MEMBERS } from '../endpoints';

export class orgMembersService {
  static GetAllMembers = async () => {
    const response = await api.get<{ members: IOrgMember[] }>(GET_ALL_ORG_MEMBERS);
    return response;
  };

  static ChangeRole = async (request: IChangeRoleRequest) => {
    const response = await api.patch<{ id: string; role: string }>(
      CHANGE_USER_ROLE(request.userId),
      { role: request.role }
    );
    return response;
  };
}
