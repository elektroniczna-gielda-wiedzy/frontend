import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EntryType } from '../enums/entry-type';
import { Entry, EntryAnswer } from '../models/entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StandardResponse } from '../models/standard-response';
import { ENTRY_TYPES } from '../mocks/entry_type';
import { ANSWERS } from '../mocks/answers';

@Injectable({
  providedIn: 'root'
})
export class EntryHttpService {
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


  createEntry(params: {entry_type_id: EntryType , title: string , content: string , categories?: number[] , image?: string }) : Observable<StandardResponse<Entry>>{
    const url = this.apiUrl;
    
    return this.http.post<StandardResponse<Entry>>(url, params);

  }
  
  
  getCategoryTypeHint(entry_type_id: EntryType | undefined){
    let result = "";

    ENTRY_TYPES.forEach( c => {if(entry_type_id === c.entry_type_id) result = c.hint });


    return result;
  }


  //TODO get from restapi
  getEntryAnswers(entry_id: number){
    console.log(entry_id)
    const url = this.apiUrl + '/' + entry_id;
    let queryParams = {
      params: new HttpParams()
    };
    
    return this.http.get<StandardResponse<EntryAnswer>>(url, queryParams);
    //return ANSWERS.answers;
  }
}
