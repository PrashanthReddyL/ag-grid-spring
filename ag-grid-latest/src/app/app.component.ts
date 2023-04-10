import { Component } from "@angular/core";

import { ColDef, GridOptions } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent { 

  paginationPageSize = 10;
  paginationNumberFormatter = (params) => {
    return "[" + params.value.toLocaleString() + "]";
  };
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: this.paginationPageSize,
    paginationNumberFormatter: this.paginationNumberFormatter
  };


  
  columnDefs: ColDef[] = [
    { headerName: 'Type', field: 'edgeType', sortable: true, filter: true},
  { headerName: 'From ID', field: 'fromId', sortable: true, filter: true },
  { headerName: 'From Type', field: 'fromType', sortable: true, filter: true },
  { headerName: 'To ID', field: 'toId', sortable: true, filter: true },
  { headerName: 'To Type', field: 'toType', sortable: true, filter: true },
  { headerName: 'Directed', field: 'directed', sortable: true, filter: true },
  { headerName: 'Source', field: 'source', sortable: true, filter: true },
  { headerName: 'Update TS', field: 'updateTs', sortable: true, filter: true }
  ];

  rowData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('/assets/testdata.json').subscribe(data => {
      const results = data.results;


      console.log(results);

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
