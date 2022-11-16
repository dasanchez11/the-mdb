import { Component, OnInit, Input } from '@angular/core';
import { IMovieList } from '../../interfaces/movie-list-response.interface';

@Component({
  selector: 'app-list-preview',
  templateUrl: './list-preview.component.html',
  styleUrls: ['./list-preview.component.scss'],
})
export class ListPreviewComponent implements OnInit {
  @Input() list!: IMovieList;
  constructor() {}

  ngOnInit(): void { }
}
