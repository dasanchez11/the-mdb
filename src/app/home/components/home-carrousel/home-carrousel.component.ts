import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { HomeStartActions } from '../../store/home/home.actions';
import { selectHomeSection } from '../../store/home/home.selectors';
import { HomeSections } from '../../store/home/initial.state';

import { mockMovies } from '../../test/mock-results';

@Component({
  selector: 'app-home-carrousel',
  templateUrl: './home-carrousel.component.html',
  styleUrls: ['./home-carrousel.component.scss'],
})
export class HomeCarrouselComponent implements OnInit {
  products = mockMovies;
  page!: number;
  totalPages!: number;
  loading!: boolean;
  errors!: string | null;
  @Input() actionToPerform!: HomeStartActions;
  @Input() carrouselName!: HomeSections;
  @Input() sectionTitle!: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectHomeSection(this.carrouselName))
      .subscribe(value => {
        this.page = value.meta.page;
        this.totalPages = value.meta.total_pages;
        this.loading = value.loading;
        this.errors = value.errors;
        // this.products = value.ids;
      });
  }

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(this.actionToPerform({ payload: this.page }));
    }
  }
}
