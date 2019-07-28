import { Component } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent {
  private params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  } 
}
