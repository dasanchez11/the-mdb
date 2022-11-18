import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { User } from 'src/app/auth/interfaces/responses/get-account-response';
import { Observable } from 'rxjs'
import { AppState } from 'src/app/app.store';


@Component({
  selector: 'app-favorites-main',
  templateUrl: './favorites-main.component.html',
})
export class FavoritesMainComponent implements OnInit {
  userLoggedIn$! : Observable<User | null>
  constructor(private store : Store<AppState>) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectCurrentUser)
  }
}
