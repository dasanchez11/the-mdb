import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()
export class MockHttpService {
  constructor(private httpService: HttpClient) {}

  testRequest() {
    return this.httpService.get('https:testurl.com/test');
  }
}

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: MockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        MockHttpService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
    service = TestBed.inject(MockHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should append api_key and sessionId', () => {
    service.testRequest().subscribe();
    httpMock.expectOne(
      'https:testurl.com/test?session_id=null&api_key=944147098cdebbad2c5d256f63d396d0'
    );
  });
});
