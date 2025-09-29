export interface IBlogState{
    title: string;
    hashtags: string[];
    coverImage : string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    isDraft: boolean;
}