import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { authReducer } from './store/auth.reducer';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthMainComponent, AuthRedirectComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthRoutingModule
  ],
})
export class AuthModule {}
