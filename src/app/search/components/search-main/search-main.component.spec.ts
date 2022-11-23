import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  Router,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectSearchMeta } from '../../store/search.selectors';

import { SearchMainComponent } from './search-main.component';

describe('SearchMainComponent', () => {
  let component: SearchMainComponent;
  let fixture: ComponentFixture<SearchMainComponent>;
  let paramValue = { search: 'search value' };
  let queryParam = new BehaviorSubject<ParamMap>(convertToParamMap(paramValue));
  let store: MockStore<AppState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchMainComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, InfiniteScrollModule],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParam,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('change properties base selector', () => {
    beforeEach(() => {
      router = TestBed.inject(Router);
      store = TestBed.inject(MockStore);
      queryParam.next(convertToParamMap(paramValue));
      fixture = TestBed.createComponent(SearchMainComponent);
      component = fixture.componentInstance;
    });

    it('should subscribe to selector', () => {
      const mockMeta = {
        page: 1,
        total_pages: 2,
        total_results: 10,
      };
      store.overrideSelector(selectSearchMeta, mockMeta);
      fixture.detectChanges();
      expect(component.page).toBe(mockMeta.page);
      expect(component.totalResults).toBe(mockMeta.total_results);
      expect(component.totalPages).toBe(mockMeta.total_pages);
    });
  });

  describe('search param with value', () => {
    beforeEach(() => {
      router = TestBed.inject(Router);
      store = TestBed.inject(MockStore);
      queryParam.next(convertToParamMap(paramValue));
      fixture = TestBed.createComponent(SearchMainComponent);
      component = fixture.componentInstance;
    });

    it('should dispatch', () => {
      spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });

  describe('search with no param value', () => {
    beforeEach(() => {
      router = TestBed.inject(Router);
      store = TestBed.inject(MockStore);
      queryParam.next(convertToParamMap({}));
      fixture = TestBed.createComponent(SearchMainComponent);
      component = fixture.componentInstance;
    });

    it('should not dispatch any action', () => {
      spyOn(store, 'dispatch');
      fixture.detectChanges();
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should search by navigating', () => {
      spyOn(router, 'navigate');
      component.handleSubmit();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    describe('Validate on scroll', () => {
      it('should validate when true', () => {
        spyOn(store, 'dispatch');
        component.page = 2;
        component.totalPages = 10;
        component.onScroll();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
      });

      it('should validate when scrolling false', () => {
        spyOn(store, 'dispatch');
        component.page = 2;
        component.totalPages = 2;
        component.onScroll();
        fixture.detectChanges();
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
    });
  });
});
