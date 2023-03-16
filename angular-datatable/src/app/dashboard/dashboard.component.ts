import { Component, OnInit } from '@angular/core';
import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiServiceService } from '../api-service.service';
import { ImageFormatterComponent } from '../ImageFormatterComponent';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;  

  columnDefs = [
    { field: 'userId', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'id', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'title', sortable: true, filter: true , flex: 1, minWidth: 100},
    { field: 'body', sortable: true, filter: true , flex: 1, minWidth: 100}
     ];

  rowData = [];
  rowModelType = 'infinite';
  defaultPageSize = 10;
  
  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.dataSource);
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {      
      this.api.getAllBooks(this.gridApi.paginationGetPageSize(), this.gridApi.paginationGetCurrentPage()).subscribe(response => {
        params.successCallback(
          response
        );
      })
    }
  }

  onPageSizeChanged(event: any) {
    this.gridApi.paginationSetPageSize(Number(event.target.value));
  }

  nameParser(params:any) {
    if (params.data != null) {
      return params.data.author.firstName+" "+params.data.author.lastName;
    }
    return "";
  }

}
