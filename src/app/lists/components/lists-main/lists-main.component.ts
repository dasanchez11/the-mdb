import { Component, OnInit } from '@angular/core';
import { IMovieList } from '../../interfaces/movie-list-response.interface';
import { ListsService } from '../../services/lists.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lists-main',
  templateUrl: './lists-main.component.html',
})
export class ListsMainComponent implements OnInit {
  moviesList$!: Observable<IMovieList[] | null>;

  constructor(private moviesListService: ListsService) {}

  ngOnInit(): void {
    this.moviesList$ = this.moviesListService
      .getLists()
      .pipe(map(response => response.results));
  }
}
