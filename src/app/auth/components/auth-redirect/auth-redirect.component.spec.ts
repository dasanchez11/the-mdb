import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthRedirectComponent } from './auth-redirect.component';
import { DebugElement } from '@angular/core';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLoading } from '../../store/auth.selectors';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AuthRedirectComponent', () => {
  let component: AuthRedirectComponent;
  let fixture: ComponentFixture<AuthRedirectComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;
  let activatedRoute: ActivatedRoute;
  let paramValue = { request_token: 'asdfasd' };
  let queryParam = new BehaviorSubject<ParamMap>(convertToParamMap(paramValue));
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthRedirectComponent],
      imports: [MatProgressSpinnerModule],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigate']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParam,
          },
        },
      ],
    }).compileComponents();
  });

  describe('AuthRedirectComponent with queryParams', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(AuthRedirectComponent);
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectCurrentUserLoading, true);
      queryParam.next(convertToParamMap(paramValue));
      spyOn(store, 'dispatch');
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render content on loading', () => {
      component.currentUserLoading$ = of(true);
      fixture.detectChanges();
      const elements = el.queryAll(By.css('.auth-redirect'));
      expect(elements.length).toBe(1);
    });

    it('should not render content on loading', () => {
      component.currentUserLoading$ = of(false);
      fixture.detectChanges();
      const elements = el.queryAll(By.css('.auth-redirect'));
      expect(elements.length).toBe(0);
    });

    it('should dispatch if request Token', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('AuthRedirectComponent with no queryParams', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(AuthRedirectComponent);
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectCurrentUserLoading, true);
      queryParam.next(convertToParamMap({}));
      spyOn(store, 'dispatch');
      component = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.debugElement;
      activatedRoute = TestBed.inject(ActivatedRoute);
      router = TestBed.inject(Router);
    });

    it('should navigate if !request token', () => {
      expect(store.dispatch).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });

  it('should render content on loading', () => {
    component.currentUserLoading$ = of(true);
    fixture.detectChanges();
    const elements = el.queryAll(By.css('.auth-redirect'));
    expect(elements.length).toBe(1);
  });

  it('should not render content on loading', () => {
    component.currentUserLoading$ = of(false);
    fixture.detectChanges();
    const elements = el.queryAll(By.css('.auth-redirect'));
    expect(elements.length).toBe(0);
  });

  it('should dispatch if request Token', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should navigate if !request token', () => {
    pending();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
