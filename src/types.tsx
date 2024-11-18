type paramTrailer = {
    api_key: string;
}

type trailerResponse = {
    data: { name: any; key: any; id: any; };
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string
};

type pixaParam = {
    signal: AbortSignal;
}

type imageType =  {
    id: number,
    pageURL: string,
    type: string,
    tags: string,
    previewURL: string,
    previewWidth: number,
    previewHeight: number,
    webformatURL: string,
    webformatWidth: number,
    webformatHeight: number,
    largeImageURL: string,
    imageWidth: number,
    imageHeight: number,
    imageSize: number,
    views: number,
    downloads: number,
    collections: number,
    likes: number,
    comments: number,
    user_id: number,
    user: string,
    userImageURL: string,
    liked?: boolean,
    disliked?: boolean
}

export type {
    paramTrailer,
    trailerResponse,
    pixaParam,
    imageType
}