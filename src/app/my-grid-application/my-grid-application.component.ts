import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

import { ThumbnailComponent } from '../thumbnail/thumbnail.component';
import { PublishedDateComponent } from '../published-date/published-date.component';
import { VideoTitleLinkComponent } from '../video-title-link/video-title-link.component';
import { SelectAllComponent } from '../select-all/select-all.component';
import { SelectRowComponent } from '../select-row/select-row.component';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  providers:  [ DataService ]
})
export class MyGridApplicationComponent implements OnInit {
  private selectionEnabled = false;
  public videoTitleColumnId = 'video-title';
  private columnDefs = [
    {
      headerName: '',
      colId: 'selectionColumn',
      headerComponentFramework: SelectAllComponent,
      cellRendererFramework: SelectRowComponent,
      width: 50
    },
    {
      headerName: '',
      field: 'thumbnail',
      cellRendererFramework: ThumbnailComponent,
      width: 130
    },
    {
      headerName: 'Published On',
      field: 'published',
      cellRendererFramework: PublishedDateComponent,
      width: 200
    },
    {
      headerName: 'Video Title',
      colId: this.videoTitleColumnId,
      valueGetter: function({ data: { id, title }}) {
        return { id, title };
      },
      cellRendererFramework: VideoTitleLinkComponent,
      width: 250
    },
    {
      headerName: 'Description',
      field: 'description',
      width: 800,
      cellStyle: { whiteSpace: 'normal' }
    }
  ];
  private gridApi;
  private gridColumnApi;
  private rowData: any;
  private selectedRecords = 0;
  private rowSelection = '';
  private totalRecords = 0;

  constructor(private dataService: DataService) {
    this.rowData = [];
    this.rowSelection = this.selectionEnabled ? 'multiple' : '';
    this.getContextMenuItems = this.getContextMenuItems.bind(this);
  }

  ngOnInit() {
    this.rowData = this.dataService.fetchItems();
    this.rowData.subscribe(data => {
      this.totalRecords = data.length
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.addEventListener('selectionChanged', () => {
      this.updateSelected();
    });
    this.updateColumnDefs();

  }

  toggleSelectionMode() {
    this.selectionEnabled = !this.selectionEnabled;
    this.setRowSelectionOption();
    this.updateColumnDefs();
    if (!this.selectionEnabled) {
      this.gridApi.deselectAll();
    }
  }

  setRowSelectionOption() {
    this.rowSelection = this.selectionEnabled ? 'multiple' : '';
  }

  updateColumnDefs() {
    this.gridColumnApi.setColumnVisible('selectionColumn', this.selectionEnabled);
  }

  updateSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedRecords = selectedNodes.length;
  }

  getContextMenuItems({ column: { colId }, value, defaultItems}) {
    if (colId !== this.videoTitleColumnId) {
      return defaultItems;
    }
    const menuItem = {
      name: 'Open in new tab',
      action: () => {
        window.open(`https://www.youtube.com/watch?v=${value.id}`, '_blank');
      },
      icon: '<img width="15" height="10" color="grey" src="../assets/new-tab.svg"/>'
    }
    return [ ...defaultItems, menuItem ];
  }
}
