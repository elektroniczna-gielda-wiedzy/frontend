import { TestBed } from '@angular/core/testing';

import { AnswerHttpService } from './answer-http.service';

describe('AnswerHttpService', () => {
  let service: AnswerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
