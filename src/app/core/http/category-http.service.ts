import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StandardResponse } from '../models/standard-response';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryHttpService {
  private readonly apiUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient) { }

  getCategories() : Observable<StandardResponse<Category>>{
    const url = this.apiUrl;
    return this.http.get<StandardResponse<Category>>(url);
  }
}
