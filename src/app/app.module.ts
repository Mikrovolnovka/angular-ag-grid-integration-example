import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'ag-grid-enterprise';

import { AgGridModule } from "ag-grid-angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { PublishedDateComponent } from './published-date/published-date.component';
import { VideoTitleLinkComponent } from './video-title-link/video-title-link.component';
import { HeaderControlsComponent } from './header-controls/header-controls.component';
import { SelectRowComponent } from './select-row/select-row.component';
import { SelectAllComponent } from './select-all/select-all.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent,
    ThumbnailComponent,
    PublishedDateComponent,
    VideoTitleLinkComponent,
    HeaderControlsComponent,
    SelectRowComponent,
    SelectAllComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([
      ThumbnailComponent,
      PublishedDateComponent,
      VideoTitleLinkComponent,
      HeaderControlsComponent,
      SelectAllComponent,
      SelectRowComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
