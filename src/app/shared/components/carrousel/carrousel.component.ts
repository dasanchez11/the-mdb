import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Movie } from '../../../home/interfaces/movies.interface';
import {
  HomeStartActions,
  SpecificStartActions,
} from '../../interfaces/response/carrousel-start.actions';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
})
export class CarrouselComponent implements OnInit {
  cards!: Movie[];
  page!: number;
  totalPages!: number;
  loading!: boolean;
  errors!: string | null;
  @Input() actionToPerform!: HomeStartActions | null;
  @Input() actionToPerformMovieId!: SpecificStartActions | null;
  @Input() carrouselSelector!: any;
  @Input() sectionTitle!: string;
  @Input() movieId!: number | null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(this.carrouselSelector).subscribe(value => {
      this.page = value.meta.page;
      this.totalPages = value.meta.total_pages;
      this.loading = value.loading;
      this.errors = value.errors;
      this.cards = value.movies;
    });
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      if (this.actionToPerform) {
        this.store.dispatch(this.actionToPerform({ payload: this.page + 1 }));
      } else if (this.actionToPerformMovieId && this.movieId) {
        this.store.dispatch(
          this.actionToPerformMovieId({
            payload: { page: this.page + 1, movieId: this.movieId },
          })
        );
      }
    }
  }
}
