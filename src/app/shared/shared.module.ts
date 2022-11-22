import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './components/card/card.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { movieReducer } from './store/movies.reducer';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CircleComponent } from './components/card/components/circle/circle.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    NavbarComponent,
    UserDropdownComponent,
    ConfirmationDialogComponent,
    CardComponent,
    CarrouselComponent,
    CircleComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    MatMenuModule,
    StoreModule.forFeature('movie', movieReducer),
    MatDialogModule,
    InfiniteScrollModule,
    NgOptimizedImage,
  ],
  exports: [NavbarComponent, CardComponent, CarrouselComponent, MatIconModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class SharedModule {}
