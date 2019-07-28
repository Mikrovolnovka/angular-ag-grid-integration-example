import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridModule } from 'ag-grid-angular';
import { VideoTitleLinkComponent } from './video-title-link.component';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { PublishedDateComponent } from '../published-date/published-date.component';
import { HeaderControlsComponent } from '../header-controls/header-controls.component';
import { SelectRowComponent } from '../select-row/select-row.component';
import { SelectAllComponent } from '../select-all/select-all.component';

describe('VideoTitleLinkComponent', () => {
  let component: VideoTitleLinkComponent;
  let fixture: ComponentFixture<VideoTitleLinkComponent>;
  let mockData = {
    value: {
      id: 'some-id',
      title: 'some-title'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThumbnailComponent,
        PublishedDateComponent,
        VideoTitleLinkComponent,
        HeaderControlsComponent,
        SelectAllComponent,
        SelectRowComponent
      ],
      imports: [
        AgGridModule.withComponents([
          ThumbnailComponent,
          PublishedDateComponent,
          VideoTitleLinkComponent,
          HeaderControlsComponent,
          SelectAllComponent,
          SelectRowComponent
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTitleLinkComponent);
    component = fixture.componentInstance;
    component.agInit(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render link to video', () => {
    const compiled = fixture.debugElement.nativeElement;
    const attrs = compiled.querySelector('a').attributes;
    expect(compiled.querySelector('a')).toBeTruthy();
    expect(attrs.getNamedItem('href').value).toEqual('https://www.youtube.com/watch?v=some-id');
    expect(compiled.querySelector('a').textContent).toEqual('some-title');
  });
});
