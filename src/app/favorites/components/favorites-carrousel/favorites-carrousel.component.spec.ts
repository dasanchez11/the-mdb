import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { mockMovies } from 'src/app/home/test/mock-results';
import { loadFavorites } from '../../store/favorites.actions';
import { selectFavoriteMovies } from '../../store/favorites.selectors';

import { FavoritesCarrouselComponent } from './favorites-carrousel.component';

describe('FavoritesCarrouselComponent', () => {
  let component: FavoritesCarrouselComponent;
  let fixture: ComponentFixture<FavoritesCarrouselComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesCarrouselComponent],
      providers: [provideMockStore()]
    }).compileComponents();
    fixture = TestBed.createComponent(FavoritesCarrouselComponent);
    store = TestBed.inject(MockStore)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action on scroll when page is less than total pages', () => {
    const page = 1
    component.page = page
    component.totalPages = 3
    const dispatchSpy = spyOn(store,'dispatch').and.callThrough()
    component.onScroll()
    expect(dispatchSpy).toHaveBeenCalledWith(loadFavorites({ page : page + 1}))
  })

  it('should load data from selector', () => {
    const mockFavoriteResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 2,
      total_results: 3,
    }
    store.overrideSelector(selectFavoriteMovies,mockFavoriteResponse)
    component.ngOnInit()
    expect(component.page).toEqual(mockFavoriteResponse.page)
    expect(component.totalPages).toEqual(mockFavoriteResponse.total_pages)
    expect(component.movies).toEqual(mockFavoriteResponse.results)
  })
});
