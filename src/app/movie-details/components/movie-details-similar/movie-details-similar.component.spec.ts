import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsSimilarComponent } from './movie-details-similar.component';

describe('MovieDetailsSimilarComponent', () => {
  let component: MovieDetailsSimilarComponent;
  let fixture: ComponentFixture<MovieDetailsSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsSimilarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
