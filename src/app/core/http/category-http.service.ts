import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StandardResponse } from '../models/standard-response';
import { Category, CategoryStatus } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpService {
  private readonly apiUrl = `${environment.apiUrl}/category`;
  constructor(private http: HttpClient) {}

  getCategories(
    params: {
      status?: CategoryStatus;
    } = {}
  ): Observable<StandardResponse<Category>> {
    const url = this.apiUrl;
    let queryParams = {
      params: new HttpParams(),
    };

    if (params.status) {
      queryParams.params = queryParams.params.set(
        'status',
        params.status
      );
    }

    return this.http.get<StandardResponse<Category>>(url, queryParams);
      
  }

  // getCategory(categoryId: number): Observable<StandardResponse<Category>> {
  //   const url = `${this.apiUrl}/${categoryId}`;
  //   return this.http.get<StandardResponse<Category>>(url);
  // }

  createCategory(category: Category): Observable<StandardResponse<Category>> {
    const url = this.apiUrl;
    return this.http.post<StandardResponse<Category>>(url, category);
  }

  updateCategory(category: Category): Observable<StandardResponse<Category>> {
    const url = `${this.apiUrl}/${category.category_id}`;
    return this.http.put<StandardResponse<Category>>(url, category);
  }

  deleteCategory(categoryId: number): Observable<StandardResponse<Category>> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<StandardResponse<Category>>(url);
  }
}
