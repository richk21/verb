export type ReportStatus = 'draft' | 'under_review' | 'approved' | 'published';

export const statusTextMap: Record<ReportStatus, string> = {
  draft: 'Draft',
  under_review: 'Under Review',
  approved: 'Approved',
  published: 'Published',
};

export const statusColorMap: Record<ReportStatus, string> = {
  draft: '#64748b',
  under_review: '#f8b007',
  approved: '#0f9d58',
  published: '#2563eb',
};
export interface IReviewerComment {
  id: string;
  authorId: string;
  authorName: string;
  comment: string;
  createdAt: string;
}

export interface ITimelineEvent {
  time: string;
  event: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface IReport {
  id: string;
  title: string;
  hashtags: string[];
  coverImage: string | null;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  isDraft: boolean;
  authorAvatar: string;
  status: ReportStatus;
  reviewerId?: string | null;
  reviewerComment?: IReviewerComment[];
  timeline?: ITimelineEvent[];
}
