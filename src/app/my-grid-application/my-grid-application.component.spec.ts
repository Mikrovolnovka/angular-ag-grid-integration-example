import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AgGridModule } from 'ag-grid-angular';

import { MyGridApplicationComponent } from './my-grid-application.component';
import { HeaderControlsComponent } from '../header-controls/header-controls.component'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { PublishedDateComponent } from '../published-date/published-date.component';
import { VideoTitleLinkComponent } from '../video-title-link/video-title-link.component';
import { SelectRowComponent } from '../select-row/select-row.component';
import { SelectAllComponent } from '../select-all/select-all.component';
import { DataService } from '../services/data.service';

describe('MyGridApplicationComponent', () => {
  let component: MyGridApplicationComponent;
  let fixture: ComponentFixture<MyGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyGridApplicationComponent,
        HeaderControlsComponent,
        ThumbnailComponent,
        PublishedDateComponent,
        VideoTitleLinkComponent,
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
        ]),
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain ag-grid-angular 3rd party component', () => {
    const compiled = fixture.debugElement.nativeElement;
    const agGrid = compiled.querySelector('ag-grid-angular');
    const attrs = agGrid.attributes;
    expect(agGrid).toBeTruthy();
    expect(attrs.getNamedItem('class').value).toEqual('ag-theme-balham');
  });

  it('should contain app-header-controls component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header-controls')).toBeTruthy();
  });

  describe('getContextMenuItems', () => {
    let defaultItems = ['copy', 'export'];
    it('should modify menu for cell "Video Title"', () => {
      const mockMenu = {
        column: {
          colId: component.videoTitleColumnId
        },
        value: {
          id: 'some-id'
        },
        defaultItems
      };
      const res = component.getContextMenuItems(mockMenu);
      expect(res.length).toEqual(defaultItems.length + 1);
      expect(res[res.length - 1].name).toEqual('Open in new tab');
      expect(res[res.length - 1].icon).toEqual('<img width="15" height="10" color="grey" src="../assets/new-tab.svg"/>');
      expect(res[res.length - 1].action).not.toBe(null);
    });
    it('should not modify menu for any other cell', () => {
      const mockMenu = {
        column: {
          colId: 'any'
        },
        value: {
          id: 'some-id'
        },
        defaultItems
      };
      const res = component.getContextMenuItems(mockMenu);
      expect(res).toEqual(defaultItems);
    });
  });
});
