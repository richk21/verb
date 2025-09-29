import { IUser } from "./user";

export interface IUserProfile {
  user: IUser;
  bio: string;
  avatarUrl: string | null;
  coverImageUrl: string | null;
}
