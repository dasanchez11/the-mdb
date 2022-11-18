import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { deleteList } from '../../store/lists.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.scss'],
})
export class ListPreviewComponent {
  @Input() list!: IListDetails;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  deleteVisible = false;

  constructor(private dialog: MatDialog, private store: Store) {}

  openConfirmationDialog(): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      'Are you sure you want to delete this list?';
    return this.confirmDialog.afterClosed();
  }

  deleteList(): void {
    this.openConfirmationDialog().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteList({ listId: parseInt(this.list.id!) }));
      }
    });
  }
}
