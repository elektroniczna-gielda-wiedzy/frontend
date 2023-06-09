import { Injectable } from '@angular/core';
import { ENTRIES } from '../mocks/entries';
import { Observable, of } from 'rxjs';
import { EntryType } from '../enums/entry-type';
import { Entry } from '../models/entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StandardResponse } from '../models/standard-response';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private readonly apiUrl = `${environment.apiUrl}/entry`;

  constructor(private http: HttpClient) { }

  getEntries(params: {type?: EntryType}) : Observable<StandardResponse<Entry>>{
    const url = this.apiUrl;
    let queryParams = {
      params: new HttpParams()
    };

    if (params.type) {
      queryParams.params = queryParams.params.set('type', params.type);
    }

    return this.http.get<StandardResponse<Entry>>(url, queryParams);

  }
}
