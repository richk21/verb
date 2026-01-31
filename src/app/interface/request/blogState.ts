export interface IBlogState{
    id: string | null;
    title: string;
    hashtags: string[];
    coverImage : string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    isDraft: boolean;
}