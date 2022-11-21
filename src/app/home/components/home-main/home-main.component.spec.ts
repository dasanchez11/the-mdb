import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppState } from 'src/app/app.store';
import {
  FetchPlayingNowStart,
  FetchPopularStart,
  FetchTopRatedStart,
  FetchUpcomingStart,
} from '../../store/home/home.actions';
import {
  selectHomePlayingNow,
  selectHomePopular,
  selectHomeTopRated,
  selectHomeUpcoming,
} from '../../store/home/home.selectors';
import { CircleComponent } from '../../../shared/components/card/components/circle/circle.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { CarrouselComponent } from '../../../shared/components/carrousel/carrousel.component';
import { HomeDiscoverComponent } from '../home-discover/home-discover.component';

import { HomeMainComponent } from './home-main.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('HomeMainComponent', () => {
  let component: HomeMainComponent;
  let fixture: ComponentFixture<HomeMainComponent>;
  let store: MockStore<AppState>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeMainComponent,
        CardComponent,
        CarrouselComponent,
        CircleComponent,
        HomeDiscoverComponent,
      ],
      imports: [
        SharedModule,
        NgOptimizedImage,
        MatIconModule,
        InfiniteScrollModule,
        CommonModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    el = fixture.debugElement;
  });

  beforeEach(() => {
    component.playingStart = FetchPlayingNowStart;
    component.topRatedStart = FetchTopRatedStart;
    component.upcomingStart = FetchUpcomingStart;
    component.popularStart = FetchPopularStart;
    component.playingMovies = selectHomePlayingNow;
    component.topRatedMovies = selectHomeTopRated;
    component.upcomingMovies = selectHomeUpcoming;
    component.popularMovies = selectHomePopular;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render explore section', () => {
    const explore = el.queryAll(By.css('.home__discover'));
    expect(explore.length).toBe(1);
  });

  it('should render explore section', () => {
    const explore = el.queryAll(By.css('.home__discover'));
    expect(explore.length).toBe(1);
  });

  it('should render the four carrousels ', () => {
    const carrousels = el.queryAll(By.css('.carrousels__container'));
    expect(carrousels[0].nativeNode.childNodes.length).toBe(4);
  });
});
