import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent {
  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
  });

  constructor(
    private snackBar: SnackbarService,
    private listService: ListsService,
    private router: Router
  ) {}

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.snackBar.openSnackBar('Please fill the fields as required', true);
    } else {
      this.listService
        .createList(this.name.value, this.description.value)
        .subscribe(response => {
          if (response) {
            this.snackBar.openSnackBar('List created succesfully');
            this.router.navigate(['/lists']);
          } else {
            this.snackBar.openSnackBar(
              'There was a problem creating the list.',
              true
            );
          }
        });
    }
  }
}
