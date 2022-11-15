import { TestBed } from '@angular/core/testing';
import { mockTokenResponse } from 'src/app/auth/test/mock-token-response';

import { RedirectService } from './redirect.service';

describe('RedirectService', () => {
  let service: RedirectService;
  let windowS: Window;

  beforeEach(() => {
    let mockWindow = { location: { href: '' } };
    TestBed.configureTestingModule({
      providers: [{ provide: Window, useValue: mockWindow }],
    });
    service = TestBed.inject(RedirectService);
    windowS = TestBed.inject(Window);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
