import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieslistsComponent } from './movieslists.component';

describe('MovieslistsComponent', () => {
  let component: MovieslistsComponent;
  let fixture: ComponentFixture<MovieslistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieslistsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieslistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
