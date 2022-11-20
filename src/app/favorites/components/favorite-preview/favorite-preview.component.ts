import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { FavoriteActions } from '../../store/favorites-actions';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
  styleUrls: ['./favorite-preview.component.scss'],
})
export class FavoritePreviewComponent {
  @Input() movie!: Movie;
  confirmDialog! : MatDialogRef<ConfirmationDialogComponent>

  constructor(private store: Store, private dialog: MatDialog) {}

  openConfirmationDialog(): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      'Are you sure you want to remove this movie from your favorites?';
    return this.confirmDialog.afterClosed();
  }

  removeFromFavorites() : void {
    this.openConfirmationDialog().subscribe(result => {
      if(result){
        this.store.dispatch(FavoriteActions.deleteFavorite({favoriteMovieId: this.movie.id}))
      }
    })
  }
}
