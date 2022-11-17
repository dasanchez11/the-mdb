import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.store';
import { selectHomePopular } from '../../store/home/home.selectors';
import { mockMovies } from '../../test/mock-results';
import { HomeCarrouselComponent } from './home-carrousel.component';

xdescribe('HomeCarrouselComponent', () => {
  let component: HomeCarrouselComponent;
  let fixture: ComponentFixture<HomeCarrouselComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeCarrouselComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    store = TestBed.inject(MockStore);
    component.carrouselSelector = selectHomePopular;
    store.overrideSelector(selectHomePopular, {
      loading: true,
      errors: null,
      meta: { page: 1, total_pages: 10, total_results: 10 },
      movies: mockMovies,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const title = el.queryAll(By.css('.carrousel-title'));
  });
});
