import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCarrouselComponent } from './favorites-carrousel.component';

describe('FavoritesCarrouselComponent', () => {
  let component: FavoritesCarrouselComponent;
  let fixture: ComponentFixture<FavoritesCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesCarrouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
