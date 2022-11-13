import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsMainComponent } from './movie-details-main.component';

describe('MovieDetailsMainComponent', () => {
  let component: MovieDetailsMainComponent;
  let fixture: ComponentFixture<MovieDetailsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDetailsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
