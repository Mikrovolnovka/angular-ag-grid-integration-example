import { Component } from '@angular/core';

@Component({
  selector: 'app-video-title-link',
  templateUrl: './video-title-link.component.html',
  styleUrls: ['./video-title-link.component.scss']
})
export class VideoTitleLinkComponent {
  private params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params.value;
  } 
}
