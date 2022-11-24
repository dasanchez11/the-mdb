import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AddRating, RemoveRating } from '../../store/specific-movie.actions';

@Component({
  selector: 'app-movie-details-rating',
  templateUrl: './movie-details-rating.component.html',
  styleUrls: ['./movie-details-rating.component.scss'],
})
export class MovieDetailsRatingComponent {
  @Input() rating!: number;
  rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() logged$!: Observable<boolean>;
  @Input() movieId!: number;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  addRate(rate: number) {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(
          AddRating({ payload: { movieId: this.movieId, rate: rate } })
        );
      }
    });
  }

  removeRate() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.openConfirmationDialog("Are you sure you want to remove this movie from the watchlist?").subscribe(result => {
          if(result){
            this.store.dispatch(RemoveRating({ payload: this.movieId }));
          }
        })
      }
    });
  }

  openConfirmationDialog(question: string): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      question;
    return this.confirmDialog.afterClosed();
  }
}
