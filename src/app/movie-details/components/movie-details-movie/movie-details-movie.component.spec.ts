import { NgOptimizedImage } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/app.store';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import {
  AddToWatchlist,
  RemoveFromWatchList,
} from '../../store/specific-movie.actions';
import { selectMovieAccountState } from '../../store/specific-movie.selectors';
import { mockMovieDetails } from '../../test/mock-movie-details';
import { MovieDetailsCircleComponent } from '../movie-details-circle/movie-details-circle.component';
import { MovieDetailsRatingComponent } from '../movie-details-rating/movie-details-rating.component';

import { MovieDetailsMovieComponent } from './movie-details-movie.component';

describe('MovieDetailsMovieComponent', () => {
  let component: MovieDetailsMovieComponent;
  let fixture: ComponentFixture<MovieDetailsMovieComponent>;
  let store: MockStore<AppState>;
  let mockAccountStates: {
    id: number;
    rated: { value: number } | boolean;
    watchlist: boolean;
    favorite: boolean;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovieDetailsMovieComponent,
        MovieDetailsCircleComponent,
        MovieDetailsRatingComponent,
      ],
      imports: [MatIconModule, NgOptimizedImage, MatTooltipModule],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieDetailsMovieComponent);
    component = fixture.componentInstance;
    component.movie = mockMovieDetails;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rating', () => {
    it('should get rating false', () => {
      mockAccountStates = {
        id: 505642,
        rated: false,
        watchlist: false,
        favorite: false,
      };
      store.overrideSelector(selectMovieAccountState, mockAccountStates);
      fixture.detectChanges();
      expect(component.rated).toBeFalse();
      expect(component.rating).toBe(0);
    });

    it('should get rating true', () => {
      mockAccountStates = {
        id: 505642,
        rated: { value: 10 },
        watchlist: false,
        favorite: false,
      };
      store.overrideSelector(selectMovieAccountState, mockAccountStates);
      fixture.detectChanges();
      expect(component.rated).toBeTrue();
      expect(component.rating).toBe(10);
    });
  });

  describe('Actions after on Init', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    describe('Watchlist', () => {
      it('should dispatch add to watchlist, watchlist=false', () => {
        spyOn(store, 'dispatch');
        component.watchlist = false;
        component.logged$ = of(true);
        component.watchlistClick();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
          AddToWatchlist({ payload: mockMovieDetails.id })
        );
      });

      it('should dispatch add to watchlist, watchlist=true', () => {
        spyOn(store, 'dispatch');
        component.watchlist = true;
        component.logged$ = of(true);
        component.watchlistClick();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
          RemoveFromWatchList({ payload: mockMovieDetails.id })
        );
      });
    });

    describe('Favorite', () => {
      it('should dispatch add to favorit, favorite=false', () => {
        spyOn(store, 'dispatch');
        component.favorite = false;
        component.logged$ = of(true);
        component.favoriteClick();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
          addMovieToFavorites({ movieId: mockMovieDetails.id })
        );
      });

      it('should dispatch add to watchlist, favorite=true', () => {
        spyOn(store, 'dispatch');
        component.favorite = true;
        component.logged$ = of(true);
        component.favoriteClick();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
          deleteFavorite({ favoriteMovieId: mockMovieDetails.id })
        );
      });
    });

    describe('Rate', () => {
      it('should toggle rate', () => {
        component.ratingOpen = false;
        component.logged$ = of(true);
        component.ratedClick();
        fixture.detectChanges();
        expect(component.ratingOpen).toBeTrue();
        component.ratedClick();
        fixture.detectChanges();
        expect(component.ratingOpen).toBeFalse();
      });
    });
  });
});
