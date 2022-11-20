import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import { IMovieDetails } from '../../test/mock-movie-details';

@Component({
  selector: 'app-movie-details-movie',
  templateUrl: './movie-details-movie.component.html',
  styleUrls: ['./movie-details-movie.component.scss'],
})
export class MovieDetailsMovieComponent implements OnInit {
  imagePath = 'https://image.tmdb.org/t/p/w500';
  imagePath2 = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  @Input() movie!: MovieDetails;
  constructor() {}

  ngOnInit(): void {}
}
