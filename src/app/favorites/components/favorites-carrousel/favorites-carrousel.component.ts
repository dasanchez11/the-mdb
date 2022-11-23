import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { loadFavorites } from '../../store/favorites.actions';
import { selectFavoriteMovies } from '../../store/favorites.selectors';

@Component({
  selector: 'app-favorites-carrousel',
  templateUrl: './favorites-carrousel.component.html',
})
export class FavoritesCarrouselComponent implements OnInit, OnDestroy {
  movies!: Movie[];
  page!: number;
  totalPages!: number;
  private unsubscribe = new Subject<void>() 

  constructor(private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.store.select(selectFavoriteMovies).pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(favorites => {
      this.movies = favorites.results;
      this.page = favorites.page;
      this.totalPages = favorites.total_pages;
    })
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(loadFavorites({ page: ++this.page }));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }


}
