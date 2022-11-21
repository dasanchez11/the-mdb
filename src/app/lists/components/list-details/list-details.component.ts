import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.movieListDetails$ = this.store.select(selectListItems);
  }

  clearList() : void {
    this.store.dispatch(clearList())
  }
}
