import { Injectable } from '@angular/core';
import { ENTRIES } from '../mocks/entries';
import { Observable, of } from 'rxjs';
import { EntryType } from '../enums/entry-type';
import { Entry } from '../models/entry';
@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor() { }


  getEntriesByType(type: EntryType): Observable<Entry[]> {
    const filteredEntries = ENTRIES.filter(entry => entry.entry_type_id === type);
    return of(filteredEntries);
  }
}
