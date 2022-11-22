import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { IMovie } from '../../interfaces/movie.interface';
import { deleteMovieFromList } from '../../store/lists.actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  @Input() movie!: IMovie;
  @Input() position!: number;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store, private dialog: MatDialog) {}

  openConfirmationDialog(): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      'Are you sure you want to remove this movie from the list?';
    return this.confirmDialog.afterClosed();
  }

  deleteMovie(): void {
    this.openConfirmationDialog().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteMovieFromList({ movieId: this.movie.id }));
      }
    });
  }
}
