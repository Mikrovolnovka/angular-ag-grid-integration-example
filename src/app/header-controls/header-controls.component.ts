import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.scss']
})
export class HeaderControlsComponent implements OnInit {
  @Input() total: number;
  @Input() selected: number;
  @Input() enabled: boolean;
  @Output() toggleSelect: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.total = 0;
    this.selected = 0;
  }

  ngOnInit() {}

  toggleMode(e) {
    this.toggleSelect.emit(e);
  }
}
