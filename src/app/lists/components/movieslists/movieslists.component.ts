import { Component, Input } from '@angular/core';
import { IMovieList } from '../../interfaces/movie-list-response.interface';

@Component({
  selector: 'app-movieslists',
  templateUrl: './movieslists.component.html',
  styleUrls: ['./movieslists.component.scss'],
})
export class MovieslistsComponent {
  @Input() lists!: IMovieList[] | null;

  constructor() {}
}
