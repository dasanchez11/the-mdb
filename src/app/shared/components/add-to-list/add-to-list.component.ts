import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { IListDetails } from 'src/app/lists/interfaces/list-details-response.interface';
import { selectAllLists } from 'src/app/lists/store/lists.selector';
import { Observable } from 'rxjs'
import { addMovieToList } from 'src/app/lists/store/lists.actions';
import { Movie } from 'src/app/home/interfaces/movies.interface';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
})
export class AddToListComponent implements OnInit {

  @Input() movieId! : number
  lists$! : Observable<IListDetails[]>

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.lists$ = this.store.select(selectAllLists)
  }

  addMovieToList(listId : string) {
    this.store.dispatch(addMovieToList({movieId: this.movieId, listId: parseInt(listId)}))
  }

}
