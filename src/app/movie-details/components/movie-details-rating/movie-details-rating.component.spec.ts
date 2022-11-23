import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/app.store';

import { MovieDetailsRatingComponent } from './movie-details-rating.component';

describe('MovieDetailsRatingComponent', () => {
  let component: MovieDetailsRatingComponent;
  let fixture: ComponentFixture<MovieDetailsRatingComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsRatingComponent],
      imports: [MatIconModule, MatTooltipModule],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieDetailsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Add rate', () => {
    it('should add rate if logged in', () => {
      spyOn(store, 'dispatch');
      component.logged$ = of(true);
      component.addRate(10);
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should not add rate if not logged in', () => {
      spyOn(store, 'dispatch');
      component.logged$ = of(false);
      component.addRate(10);
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove rate', () => {
    it('should remove rate if logged in', () => {
      spyOn(store, 'dispatch');
      component.logged$ = of(true);
      component.removeRate();
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should not remove rate if not logged in', () => {
      spyOn(store, 'dispatch');
      component.logged$ = of(false);
      component.removeRate();
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
