export interface IUnsplashUrls{
    small: string;
    regular: string
}

export interface IUnsplashResponse {
    id: number;
    urls: IUnsplashUrls;
    alt_description: string;
}