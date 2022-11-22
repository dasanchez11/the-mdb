import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { loadFavorites } from '../../store/favorites.actions';
import { selectFavoriteMovies } from '../../store/favorites.selectors';

@Component({
  selector: 'app-favorites-carrousel',
  templateUrl: './favorites-carrousel.component.html',
})
export class FavoritesCarrouselComponent implements OnInit {
  movies!: Movie[];
  page!: number;
  totalPages!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectFavoriteMovies).subscribe(favorites => {
      this.movies = favorites.results;
      this.page = favorites.page;
      this.totalPages = favorites.total_pages;
    });
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(loadFavorites({ page: ++this.page }));
    }
  }
}
