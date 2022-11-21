import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsMovieComponent } from './movie-details-movie.component';

describe('MovieDetailsMovieComponent', () => {
  let component: MovieDetailsMovieComponent;
  let fixture: ComponentFixture<MovieDetailsMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
