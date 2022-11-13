import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../../services/auth-http.service';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
})
export class AuthMainComponent implements OnInit {
  constructor(private authHttp: AuthHttpService) {}

  ngOnInit(): void {}

  loginClick() {
    this.authHttp.getToken().subscribe(value => {
      console.log(value);
    });
  }
}
