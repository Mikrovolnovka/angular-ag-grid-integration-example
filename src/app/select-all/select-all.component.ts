import { Component, ElementRef } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-select-all',
  templateUrl: './select-all.component.html',
  styleUrls: ['./select-all.component.scss']
})
export class SelectAllComponent implements IHeaderAngularComp {
  public params: any;
  private elementRef: ElementRef;
  public allSelected: Boolean;

  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
  }

  agInit(params: any): void {
    this.params = params;
    this.params.api.addEventListener('selectionChanged', () => {
      this.updateCheckBox();
    });
  }

  toggleSelectAll({ target: { checked }}) {
    if (checked) {
      this.params.api.selectAll();
    } else {
      this.params.api.deselectAll();
    }
  }

  updateCheckBox() {
    const total = this.params.api.getDisplayedRowCount();
    const selected = this.params.api.getSelectedNodes().length;
    this.allSelected = total === selected ? true : false;
  }
}
