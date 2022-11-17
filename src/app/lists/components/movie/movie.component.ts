import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  @Input() movie!: IMovie;
  @Input() position!: number;
  @Output() movieIdToDelete = new EventEmitter<number>();

  constructor() {}

  deleteMovie(): void {
    this.movieIdToDelete.emit(this.movie.id);
  }
}
