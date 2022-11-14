import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthRedirectComponent } from './auth-redirect.component';
import { DebugElement } from '@angular/core';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLoading } from '../../store/auth.selectors';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

fdescribe('AuthRedirectComponent', () => {
  let component: AuthRedirectComponent;
  let fixture: ComponentFixture<AuthRedirectComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;
  let activatedRoute: ActivatedRoute;

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
            queryParamMap: of(convertToParamMap({ request_token: 'asdfasd' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRedirectComponent);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCurrentUserLoading, true);
    spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    activatedRoute = TestBed.inject(ActivatedRoute);
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
  });

  it('should navigate if !request token', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
