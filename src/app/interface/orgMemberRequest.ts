import { UserRole } from './user';

export interface IChangeRoleRequest {
  userId: string;
  role: UserRole;
}
