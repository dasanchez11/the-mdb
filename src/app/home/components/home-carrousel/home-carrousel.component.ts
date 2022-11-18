import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { Movie } from '../../interfaces/movies.interface';
import { HomeStartActions } from '../../store/home/home.actions';

import { mockMovies } from '../../test/mock-results';

@Component({
  selector: 'app-home-carrousel',
  templateUrl: './home-carrousel.component.html',
  styleUrls: ['./home-carrousel.component.scss'],
})
export class HomeCarrouselComponent implements OnInit {
  cards!: Movie[];
  page!: number;
  totalPages!: number;
  loading!: boolean;
  errors!: string | null;
  @Input() actionToPerform!: HomeStartActions;
  @Input() carrouselSelector!: any;
  @Input() sectionTitle!: string;

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
      this.store.dispatch(this.actionToPerform({ payload: this.page + 1 }));
    }
  }
}
