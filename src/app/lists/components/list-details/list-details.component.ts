import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { ListsService } from '../../services/lists.service';
import { ListsActions } from '../../store/list-actions';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  movieListDetails$!: IListDetails;

  constructor(
    private route: ActivatedRoute,
    private listService: ListsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    let listId = this.route.snapshot.params['listId'];
    this.listService.getListDetails(parseInt(listId!)).subscribe(response => {
      this.movieListDetails$ = response;
      this.store.dispatch(ListsActions.updateLists({ list: response }));
    });
  }
}
