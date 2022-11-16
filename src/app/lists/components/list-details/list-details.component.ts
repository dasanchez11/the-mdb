import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { ListsService } from '../../services/lists.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  movieListDetails$!: Observable<IListDetails>;

  constructor(
    private route: ActivatedRoute,
    private listService: ListsService
  ) {}

  ngOnInit(): void {
    let listId = this.route.snapshot.params['listId'];
    this.movieListDetails$ = this.listService.getListDetails(parseInt(listId!));
  }
}
