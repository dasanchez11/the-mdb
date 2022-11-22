import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsRatingComponent } from './movie-details-rating.component';

describe('MovieDetailsRatingComponent', () => {
  let component: MovieDetailsRatingComponent;
  let fixture: ComponentFixture<MovieDetailsRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
