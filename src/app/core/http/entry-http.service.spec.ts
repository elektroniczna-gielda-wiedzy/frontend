import { TestBed } from '@angular/core/testing';

import { EntryHttpService } from './entry-http.service';

describe('EntryHttpService', () => {
  let service: EntryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
