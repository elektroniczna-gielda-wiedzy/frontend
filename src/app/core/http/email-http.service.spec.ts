import { TestBed } from '@angular/core/testing';

import { EmailHttpService } from './email-http.service';

describe('EmailHttpService', () => {
  let service: EmailHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
