export interface IUnsplashImages{
    id: string;
    description: string;
    thumb: string;
    regular: string;
    author: string;
}

export interface IUnsplashImagesResponse {
   images: IUnsplashImages[];
}