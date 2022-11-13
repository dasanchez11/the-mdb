import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, take } from 'rxjs';
import { AuthHttpService } from '../../services/auth-http.service';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.scss'],
})
export class AuthRedirectComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authHttp: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        take(1),
        switchMap(params => {
          const requestToken = params.get('request_token');
          if (!requestToken) {
            this.router.navigate(['login']);
            return of(false);
          }
          return this.authHttp.loginUser(requestToken);
        })
      )
      .subscribe(value => {
        if (value) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
  }
}
