import { IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiServiceService } from '../api-service.service';
import { ImageFormatterComponent } from '../ImageFormatterComponent';


import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  gridOptions: GridOptions = {};
  columnDefs: ColDef[] = [
    { headerName: 'Type', field: 'edgeType' },
  { headerName: 'From ID', field: 'fromId' },
  { headerName: 'From Type', field: 'fromType' },
  { headerName: 'To ID', field: 'toId' },
  { headerName: 'To Type', field: 'toType' },
  { headerName: 'Directed', field: 'directed' },
  { headerName: 'Source', field: 'source' },
  { headerName: 'Update TS', field: 'updateTs' }
  ];
  rowData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('/assets/testdata.json').subscribe(data => {
      const results = data.results;


      const edgeSetData = results.flatMap((result: any) => {
        return Object.keys(result)
          .filter(key => key.includes("FinalEdgeSet"))
          .flatMap((edgeSetKey: any) => result[edgeSetKey]);
      });

      const rows = edgeSetData.map((edge: any) => ({
        edgeType: edge.e_type,
        fromId: edge.from_id,
        fromType: edge.from_type,
        toId: edge.to_id,
        toType: edge.to_type,
        directed: edge.directed,
        source: edge.attributes.source,
        updateTs: edge.attributes.updateTS
      }))
      this.rowData = rows;
    });
  }
}
