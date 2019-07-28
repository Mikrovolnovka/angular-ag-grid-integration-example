import { Component } from '@angular/core';

@Component({
  selector: 'app-published-date',
  templateUrl: './published-date.component.html',
  styleUrls: ['./published-date.component.scss']
})
export class PublishedDateComponent {
  private date: string;

  constructor() { }

  agInit(params: any): void {
    this.date = this.formatDate(params.value);
  }

  formatDate(date) {
    var d = new Date(date);
    return d.toUTCString();
  }
}
