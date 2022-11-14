import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavbarComponent, UserDropdownComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [NavbarComponent],
})
export class SharedModule {}
