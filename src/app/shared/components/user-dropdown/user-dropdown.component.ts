import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { LogoutStart } from 'src/app/auth/store/auth.actions';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent implements OnInit {
  username$!: Observable<string>;
  loggedIn$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.username$ = this.store
      .select(selectCurrentUser)
      .pipe(map(user => (user ? user.username : '')));
  }

  handleLogout() {
    this.store.dispatch(LogoutStart());
  }
}
