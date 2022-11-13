import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, fail: boolean = false) {
    const color = fail ? 'mat-warn' : 'bg-green-900';
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['mat-toolbar', color],
    });
  }
}
