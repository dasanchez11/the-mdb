import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { loadFavorites } from '../../store/favorites.actions';

@Component({
  selector: 'app-favorites-main',
  templateUrl: './favorites-main.component.html',
})
export class FavoritesMainComponent implements OnInit {
  userLoggedIn$!: Observable<User | null>;
  favorites$!: Observable<(Movie | undefined)[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadFavorites({ page: 1 }));
    this.store.dispatch(loadLists())
    this.userLoggedIn$ = this.store.select(selectCurrentUser);
  }
}
