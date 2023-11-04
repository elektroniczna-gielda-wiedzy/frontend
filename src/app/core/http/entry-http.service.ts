import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EntryType } from '../enums/entry-type';
import { Entry, EntryRequest } from '../models/entry';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StandardResponse } from '../models/standard-response';
import { ENTRY_TYPES } from '../mocks/entry_type';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class EntryHttpService {
  private readonly apiUrl = `${environment.apiUrl}/entry`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getEntries(params: {
    type?: EntryType;
    categories?: Number[];
    query?: string;
    sort?: string;
    page?: number;
    per_page?: number;
  }): Observable<StandardResponse<Entry>> {
    const url = this.apiUrl;
    let queryParams = {
      params: new HttpParams(),
    };

    if (params.type || params.type === 0) {
      queryParams.params = queryParams.params.set('type', params.type);
    }

    if (params.categories && params.categories.length > 0) {
      queryParams.params = queryParams.params.set(
        'categories',
        params.categories.join(',')
      );
    }

    if (params.query) {
      queryParams.params = queryParams.params.set('query', params.query);
    }

    if (params.sort || params.sort === '0') {
      queryParams.params = queryParams.params.set('sort', params.sort);
    }

    if (params.page) {
      queryParams.params = queryParams.params.set('page', params.page);
    }

    if (params.per_page) {
      queryParams.params = queryParams.params.set('per_page', params.per_page);
    }

    return this.http.get<StandardResponse<Entry>>(url, queryParams);
  }

  getUserEntries(userId?: number | null): Observable<StandardResponse<Entry>> {
    const url = this.apiUrl;
    let queryParams = {
      params: new HttpParams(),
    };

    if (!userId) {
      userId = this.tokenService.getUserId();
    }

    if (userId) {
      queryParams.params = queryParams.params.set('author', userId);
    } else {
      return of({ result: [], messages: ['No user id found'], success: false });
    }

    return this.http.get<StandardResponse<Entry>>(url, queryParams);
  }

  getMyFavorites(): Observable<StandardResponse<Entry>> {
    const url = this.apiUrl;
    let queryParams = {
      params: new HttpParams(),
    };

    const userId = this.tokenService.getUserId();
    if (userId) {
      queryParams.params = queryParams.params.set('favorites', userId);
    } else {
      return of({ result: [], messages: ['No user id found'], success: false });
    }

    return this.http.get<StandardResponse<Entry>>(url, queryParams);
  }

  setFavorite(id: number, value: number): Observable<StandardResponse<Entry>> {
    const url = `${this.apiUrl}/${id}/favorite`;
    return this.http.put<StandardResponse<Entry>>(url, { value });
  }

  createEntry(params: EntryRequest): Observable<StandardResponse<Entry>> {
    const url = this.apiUrl;

    return this.http.post<StandardResponse<Entry>>(url, params);
  }

  getEntry(id: number): Observable<StandardResponse<Entry>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<StandardResponse<Entry>>(url);
  }

  getCategoryTypeHint(entry_type_id: EntryType | undefined) {
    let result = '';

    ENTRY_TYPES.forEach((c) => {
      if (entry_type_id === c.entry_type_id) result = c.hint;
    });

    return result;
  }

  updateEntry(
    id: number,
    params: EntryRequest
  ): Observable<StandardResponse<Entry>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.put<StandardResponse<Entry>>(url, params);
  }

  deleteEntry(id: number): Observable<StandardResponse<Entry>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<StandardResponse<Entry>>(url);
  }

  vote(
    value: number,
    entryId: number,
    answerId?: number
  ): Observable<StandardResponse<Entry>> {
    let url = `${this.apiUrl}/${entryId}`;
    if (answerId) {
      url += `/answer/${answerId}`;
    }
    url += `/vote`;

    return this.http.put<StandardResponse<Entry>>(url, { value });
  }
}
