import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Video } from '../models/video';
import { Thumbnail } from '../models/thumbnail';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public dataUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';
    items: Video[];
    error;
    
    constructor(private http: HttpClient) {
        this.items = [];
    }

    fetchItems() {
        return this.http.get<Video[]>(this.dataUrl)
            .pipe(
                map((data: any) => {
                    if (!data || !data.items || !data.items.length) {
                        return [];
                    }
                    return data.items.map(({ id: { videoId: id }, snippet: { title, description, thumbnails: { default: { url, width, height } }, publishedAt: published }}) => {
                        return {
                            title,
                            description,
                            published,
                            id,
                            thumbnail: {
                                url,
                                width,
                                height
                            }
                        };            
                    });
                })
            );
    }
}
