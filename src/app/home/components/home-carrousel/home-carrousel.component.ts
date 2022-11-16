import { Component, Input, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';

import { mockMovies } from '../../test/mock-results';

@Component({
  selector: 'app-home-carrousel',
  templateUrl: './home-carrousel.component.html',
  styleUrls: ['./home-carrousel.component.scss'],
})
export class HomeCarrouselComponent implements OnInit {
  cards = mockMovies;
  @Input() page!: number;
  @Input() totalPages!: number;
  @Input() actionToPerform!: Action;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  onScroll() {
    if (this.page + 1 <= this.totalPages) {
      this.store.dispatch(this.actionToPerform);
    }
  }
}
