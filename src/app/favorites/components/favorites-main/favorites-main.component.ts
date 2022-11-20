import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { selectFavoriteMovies } from '../../store/favorite.selectors';

@Component({
  selector: 'app-favorites-main',
  templateUrl: './favorites-main.component.html',
  animations: [
    trigger('slide-left', [
      transition('* => *', [
        query(':enter',[
          style({ transform: 'translateX(-100%)' }),
          stagger(100, [animate(200, style({ transform: 'translateX(0%)' }))]),
        ], {optional: true})
      ]),
    ]),
  ],
})
export class FavoritesMainComponent implements OnInit {
  userLoggedIn$!: Observable<User | null>;
  favorites$!: Observable<(Movie | undefined)[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectCurrentUser);
    this.favorites$ = this.store.select(selectFavoriteMovies);
  }
}
