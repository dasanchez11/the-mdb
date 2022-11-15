import { TestBed } from '@angular/core/testing';
import { mockUser } from 'src/app/auth/test/mock-user';

import { AuthLocalStorageService } from './auth-local-storage.service';

describe('AuthLocalStorageService', () => {
  let service: AuthLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set element', () => {
    spyOn(localStorage, 'setItem');
    service.setElement('name', 'asdf');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should get element', () => {
    spyOn(localStorage, 'getItem');
    service.getElement('requestToken');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should get element', () => {
    spyOn(localStorage, 'getItem');
    service.getElement('requestToken');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should get current User', () => {
    spyOn(AuthLocalStorageService, 'getCurrentUser').and.returnValue(mockUser);
    const user = AuthLocalStorageService.getCurrentUser();
    expect(user).toEqual(mockUser);
  });
});
