import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { IListDetails } from 'src/app/lists/interfaces/list-details-response.interface';
import { addMovieToList } from 'src/app/lists/store/lists.actions';
import { selectAllLists } from 'src/app/lists/store/lists.selector';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
})
export class AddToListComponent implements OnInit {
  @Input() movieId!: number;
  lists$!: Observable<IListDetails[]>;
  dropdownHidden = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.lists$ = this.store.select(selectAllLists);
  }

  addMovieToList(listId: string) {
    this.store.dispatch(
      addMovieToList({ movieId: this.movieId, listId: parseInt(listId) })
    );
  }

  isMovieInList(list: IListDetails): boolean {
    if (list) {
      const movie = list.items.find(movie => movie.id === this.movieId);
      return movie !== undefined;
    }
    return false;
  }
}
