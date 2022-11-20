import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { FavoriteActions } from '../../store/favorites-actions';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
  styleUrls: ['./favorite-preview.component.scss'],
})
export class FavoritePreviewComponent implements OnInit {
  @Input() movie!: Movie;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  removeFromFavorites() : void {
    this.store.dispatch(FavoriteActions.deleteFavorite({favoriteMovieId: this.movie.id}))
  }
}
