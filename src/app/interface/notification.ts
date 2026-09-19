export type NotificationType =
  | 'review_assigned'
  | 'report_approved'
  | 'changes_requested'
  | 'report_published';

export interface INotification {
  id: string;
  type: NotificationType;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface IOrgMember {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  role: string;
}
