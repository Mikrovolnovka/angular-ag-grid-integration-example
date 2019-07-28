import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridModule } from 'ag-grid-angular';
import { ThumbnailComponent } from './thumbnail.component';
import { VideoTitleLinkComponent } from '../video-title-link/video-title-link.component';
import { PublishedDateComponent } from '../published-date/published-date.component';
import { HeaderControlsComponent } from '../header-controls/header-controls.component';
import { SelectRowComponent } from '../select-row/select-row.component';
import { SelectAllComponent } from '../select-all/select-all.component';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;
  let mockData = {
    value: {
      url: 'some-url',
      width: 1,
      height: 2
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
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
    component.agInit(mockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render img tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    const attrs = compiled.querySelector('img').attributes;
    expect(compiled.querySelector('img')).toBeTruthy();
    expect(attrs.getNamedItem('src').value).toEqual('some-url');
    expect(attrs.getNamedItem('width').value).toEqual('1');
    expect(attrs.getNamedItem('height').value).toEqual('2');
  });
});
