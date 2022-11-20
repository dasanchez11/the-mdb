import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsRecomendationsComponent } from './movie-details-recomendations.component';

describe('MovieDetailsRecomendationsComponent', () => {
  let component: MovieDetailsRecomendationsComponent;
  let fixture: ComponentFixture<MovieDetailsRecomendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsRecomendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsRecomendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
