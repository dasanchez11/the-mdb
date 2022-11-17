import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { selectAllLists } from '../../store/lists.selector';

@Component({
  selector: 'app-lists-main',
  templateUrl: './lists-main.component.html',
})
export class ListsMainComponent implements OnInit {
  moviesList$!: Observable<IListDetails[] | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.moviesList$ = this.store.select(selectAllLists);
  }
}
