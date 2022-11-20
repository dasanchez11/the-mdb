import { NgOptimizedImage } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppState } from 'src/app/app.store';
import { HomeModule } from '../../../home/home.module';
import { FetchPlayingNowStart } from '../../../home/store/home/home.actions';
import { selectHomePopular } from '../../../home/store/home/home.selectors';
import { mockMovies } from '../../../home/test/mock-results';
import { mockCarrouselResponse } from '../../../home/test/mock-selector';
import { CircleComponent } from '../card/components/circle/circle.component';
import { HomeCardComponent } from '../card/card.component';
import { HomeCarrouselComponent } from './carrousel.component';

describe('HomeCarrouselComponent', () => {
  let component: HomeCarrouselComponent;
  let fixture: ComponentFixture<HomeCarrouselComponent>;
  let el: DebugElement;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeCarrouselComponent,
        HomeCardComponent,
        CircleComponent,
      ],
      imports: [InfiniteScrollModule, MatIconModule, NgOptimizedImage],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCarrouselComponent);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectHomePopular, mockCarrouselResponse);
    component = fixture.componentInstance;
    component.carrouselSelector = selectHomePopular;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    component.sectionTitle = 'title';
    component.cards = [];
    fixture.detectChanges();
    const title = el.queryAll(By.css('.carrousel-title'));
    const titleText = title[0].nativeNode.innerText;
    expect(titleText).toBe('title');
  });

  it('should render the cards', () => {
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.carrousel__card'));
    expect(cards.length).toBe(20);
  });

  it('should Trigger on scroll', () => {
    spyOn(store, 'dispatch');
    component.actionToPerform = FetchPlayingNowStart;
    component.page = 1;
    component.totalPages = 1;
    component.onScroll();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    component.page = 1;
    component.totalPages = 10;
    component.onScroll();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
