import { Component } from '@angular/core';

@Component({
  selector: 'app-select-row',
  templateUrl: './select-row.component.html',
  styleUrls: ['./select-row.component.scss']
})
export class SelectRowComponent {
  private params: any;

  constructor() {
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  agInit(params: any): void {
    this.params = params;
  }

  handleChange({ target: { checked } }) {
    this.params.node.setSelected(checked);
  }

  handleClick(e) {
    e.stopPropagation();
    this.handleChange(e);
  }
}
