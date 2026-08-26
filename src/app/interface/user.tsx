export type UserRole = 'contributor' | 'reviewer' | 'auditor' | 'admin';
export interface IUser {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  role?: UserRole;
}
