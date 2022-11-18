import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IMovieList } from '../../interfaces/movie-list-response.interface';

import { MovieslistsComponent } from './movieslists.component';

const mockMoviesList = [
  {
    description: 'test',
    favorite_count: 1,
    id: '1',
    item_count: 1,
    iso_639_1: 'test',
    list_type: 'test',
    name: 'test',
    poster_path: 'path',
  },
  {
    description: 'test',
    favorite_count: 1,
    id: '2',
    item_count: 1,
    iso_639_1: 'test',
    list_type: 'test',
    name: 'test',
    poster_path: 'path',
  },
];

@Component({
  selector: 'app-list-preview',
  template: '<div> Mock </div>',
})
class MockComponent {
  @Input() list!: IMovieList;
}

describe('MovieslistsComponent', () => {
  let component: MovieslistsComponent;
  let fixture: ComponentFixture<MovieslistsComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieslistsComponent, MockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieslistsComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    component.lists = mockMoviesList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct amount of movies', () => {
    const elementCount = element.queryAll(By.css('app-list-preview'));
    expect(elementCount.length).toEqual(mockMoviesList.length);
  });
});
