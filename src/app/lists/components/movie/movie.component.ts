import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie!: IMovie;
  @Input() position!: number;

  constructor() {}

  ngOnInit(): void {}
}
