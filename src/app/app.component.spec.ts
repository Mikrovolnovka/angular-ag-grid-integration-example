import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { HeaderControlsComponent } from './header-controls/header-controls.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { PublishedDateComponent } from './published-date/published-date.component';
import { VideoTitleLinkComponent } from './video-title-link/video-title-link.component';
import { SelectRowComponent } from './select-row/select-row.component';
import { SelectAllComponent } from './select-all/select-all.component';
import { DataService } from './services/data.service';

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
      declarations: [
        AppComponent,
        MyGridApplicationComponent,
        HeaderControlsComponent,
        ThumbnailComponent,
        PublishedDateComponent,
        VideoTitleLinkComponent,
        SelectAllComponent,
        SelectRowComponent
      ],
      providers: [
        DataService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ag-grid-cli'`, () => {
    expect(component.title).toEqual('ag-grid-cli');
  });

  it('should render my-app-component component', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-my-grid-application')).toBeTruthy();
  });
});
