import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { selectAllLists } from '../../store/lists.selector';
import { MockMoviesListComponent } from '../../test/mock-components/mock-movies-list.component';

import { ListsMainComponent } from './lists-main.component';

const mockLists = [
  {
    created_by: 'Test',
    description: 'test',
    favorite_count: 1,
    id: 'string',
    items: [],
    item_count: 1,
    iso_639_1: 'test',
    name: 'test',
    poster_path: null,
    list_type: 'test',
  },
  {
    created_by: 'Test2',
    description: 'test2',
    favorite_count: 2,
    id: 'string',
    items: [],
    item_count: 2,
    iso_639_1: 'test',
    name: 'test',
    poster_path: null,
    list_type: 'test',
  },
];

describe('ListsMainComponent', () => {
  let component: ListsMainComponent;
  let fixture: ComponentFixture<ListsMainComponent>;
  let moviesListElement: DebugElement;
  let moviesListComponent: MockMoviesListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsMainComponent, MockMoviesListComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAllLists,
              value: mockLists,
            },
          ],
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListsMainComponent);
    moviesListElement = fixture.debugElement.query(
      By.directive(MockMoviesListComponent)
    );
    moviesListComponent = moviesListElement.injector.get(
      MockMoviesListComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass mockList to movies list component', () => {
    expect(moviesListComponent.lists).toBe(mockLists);
  });
});
