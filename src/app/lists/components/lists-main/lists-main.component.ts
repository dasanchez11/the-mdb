import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { ListsActions } from '../../store/list-actions';
import { selectAllLists } from '../../store/lists.selector';

@Component({
  selector: 'app-lists-main',
  templateUrl: './lists-main.component.html',
})
export class ListsMainComponent implements OnInit {
  moviesList$!: Observable<IListDetails[] | null>;
  userLoggedIn$!: Observable<User | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(ListsActions.loadLists());
    this.moviesList$ = this.store.select(selectAllLists);
    this.userLoggedIn$ = this.store.select(selectCurrentUser);
  }
}
