import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';

@NgModule({
  declarations: [AuthMainComponent, AuthRedirectComponent],
  imports: [CommonModule, MatButtonModule, HttpClientModule],
})
export class AuthModule {}
