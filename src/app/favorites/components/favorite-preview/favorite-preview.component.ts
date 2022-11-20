import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/home/interfaces/movies.interface';

@Component({
  selector: 'app-favorite-preview',
  templateUrl: './favorite-preview.component.html',
  styleUrls: ['./favorite-preview.component.scss'],
})
export class FavoritePreviewComponent implements OnInit {
  @Input() movie!: Movie;

  constructor() {}

  ngOnInit(): void {}
}
