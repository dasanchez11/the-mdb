import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';
import { StoreModule } from '@ngrx/store';
import { storeReducer } from '../app.store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AuthMainComponent, AuthRedirectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('auth', storeReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
