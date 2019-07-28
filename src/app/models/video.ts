import { Thumbnail } from './thumbnail';

export interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: Thumbnail;
    published: string;
};
