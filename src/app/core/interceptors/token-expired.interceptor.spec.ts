import { TestBed } from '@angular/core/testing';

import { TokenExpiredInterceptor } from './token-expired.interceptor';

describe('TokenExpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenExpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenExpiredInterceptor = TestBed.inject(TokenExpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
