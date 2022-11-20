import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesMainComponent } from './favorites-main.component';

describe('FavoritesMainComponent', () => {
  let component: FavoritesMainComponent;
  let fixture: ComponentFixture<FavoritesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesMainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
