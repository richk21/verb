export interface IBlog {
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
}