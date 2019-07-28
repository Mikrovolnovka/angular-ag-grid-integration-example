import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchItems', () => {
    it('should return an Observable<Video[]>', () => {
        const dummyVideos = [{
            "id": {
                "videoId": "3fumBcKC6RE"
             },
             "snippet": {
                "publishedAt": "2011-05-12T20:01:31.000Z",
                "title": "Lil Wayne - John (Explicit) ft. Rick Ross",
                "description": "Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg",
                        "width": 120,
                        "height": 90
                    }
                }
            }
        }, {
            "id": {
                "videoId": "en9ZkOo2rRA"
            },
            "snippet": {
                "publishedAt": "2017-09-10T08:52:42.000Z",
                "title": "Are You Sleeping (Brother John)? - Amazing Songs for Children | LooLoo Kids",
                "description": "Are You Sleeping? Watch this super fun animated nursery rhyme created by LooLoo Kids and let's sing together Download our new app for and now: ...",
                "thumbnails": {
                    "default": {
                        "url": "https://i.ytimg.com/vi/en9ZkOo2rRA/default.jpg",
                        "width": 120,
                        "height": 90
                    }
                }
            }
        }];
        const dummyItems = [{
            title: "Lil Wayne - John (Explicit) ft. Rick Ross",
            description: "Music video by Lil Wayne performing John. (C) 2011 Cash Money Records Inc.",
            published: "2011-05-12T20:01:31.000Z",
            id: "3fumBcKC6RE",
            thumbnail: {
                url: "https://i.ytimg.com/vi/3fumBcKC6RE/default.jpg",
                width: 120,
                height: 90
            }
        }, {
            title: "Are You Sleeping (Brother John)? - Amazing Songs for Children | LooLoo Kids",
            description: "Are You Sleeping? Watch this super fun animated nursery rhyme created by LooLoo Kids and let's sing together Download our new app for and now: ...",
            published: "2017-09-10T08:52:42.000Z",
            id: "en9ZkOo2rRA",
            thumbnail: {
                url: "https://i.ytimg.com/vi/en9ZkOo2rRA/default.jpg",
                width: 120,
                height: 90
            }
        }];
    
        service.fetchItems().subscribe(items => {
            expect(items.length).toBe(2);
            expect(items).toEqual(dummyItems);
        });
    
        const req = httpMock.expectOne(service.dataUrl);
        expect(req.request.method).toBe("GET");
        req.flush({ items: dummyVideos });
    });

    it('should throw an error nothing is found', () => {
        const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
        const data = 'Invalid request parameters';

        service.fetchItems().subscribe(() => {}, error => {
            expect(error.error).toEqual(data);
        });
    
        httpMock.expectOne(service.dataUrl).flush(data, mockErrorResponse);
    });
  });
});