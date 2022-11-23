import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { IListDetails } from 'src/app/lists/interfaces/list-details-response.interface';
import { addMovieToList, deleteMovieFromList } from 'src/app/lists/store/lists.actions';
import { selectAllLists } from 'src/app/lists/store/lists.selector';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
})
export class AddToListComponent implements OnInit {
  @Input() movieId!: number;
  lists$!: Observable<IListDetails[]>;
  dropdownHidden = true;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.lists$ = this.store.select(selectAllLists);
  }

  openConfirmationDialog(question: string): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      question;
    return this.confirmDialog.afterClosed();
  }

  addMovieToList(listId: string) {
    this.store.dispatch(
      addMovieToList({ movieId: this.movieId, listId: parseInt(listId) })
    );
  }

  removeMovieFromList(listId: string){
    this.openConfirmationDialog("Are you sure you want to remove this movie from the list?").subscribe(result => {
      if(result){
        this.store.dispatch(
          deleteMovieFromList({movieId : this.movieId, listId: parseInt(listId)})
        )
      }
    })
  }

  isMovieInList(list: IListDetails): boolean {
    if (list) {
      const movie = list.items.find(movie => movie.id === this.movieId);
      return movie !== undefined;
    }
    return false;
  }

}
