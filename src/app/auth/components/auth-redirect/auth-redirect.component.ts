import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { SignInStart } from '../../store/auth.actions';
import { selectCurrentUserLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.scss'],
})
export class AuthRedirectComponent implements OnInit {
  currentUserLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.currentUserLoading$ = this.store.select(selectCurrentUserLoading);
    this.activatedRoute.queryParamMap.subscribe(params => {
      const requestToken = params.get('request_token');
      if (!requestToken) {
        this.router.navigate(['login']);
      } else {
        this.store.dispatch(SignInStart({ payload: requestToken }));
      }
    });
  }
}
