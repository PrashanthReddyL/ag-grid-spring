import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private client: HttpClient) {}

  getAllBooks(pageSize: Number, pageNumber: Number): Observable<any> {
    let url = "https://jsonplaceholder.typicode.com/posts";
    console.log("Reading from URL : "+url);
    return this.client.get(url);
  }

  getLocalData(): Observable<any>  {
    return this.client.get('assets/testdata.json');
  }


  
  
}
