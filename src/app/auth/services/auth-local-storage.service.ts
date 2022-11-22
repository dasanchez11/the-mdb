import { Injectable } from '@angular/core';
import { User } from '../interfaces/responses/get-account-response';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorageService {
  setElement(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getElement(elementName: LocalStorageItems) {
    const element = localStorage.getItem(elementName);
    if (element) {
      return JSON.parse(element);
    } else {
      return null;
    }
  }

  static getCurrentUser(): User | null {
    const value = localStorage.getItem('currentUser');
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
}

export type LocalStorageItems = 'expiresAt' | 'sessionId' | 'requestToken';
