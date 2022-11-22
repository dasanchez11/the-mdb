import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { clearList } from '../../store/lists.actions';
import { selectListItems } from '../../store/lists.selector';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  movieListDetails$!: Observable<IListDetails>;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>
  imagePath = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/"

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.movieListDetails$ = this.store.select(selectListItems);
  }

  openConfirmationDialog(): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      'Are you sure you want to clear all list items?';
    return this.confirmDialog.afterClosed();
  }

  clearList(): void {
    this.openConfirmationDialog().subscribe(result => {
      if(result){
        this.store.dispatch(clearList());
      }
    })
  }
}
