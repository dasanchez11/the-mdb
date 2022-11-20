import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePreviewComponent } from './favorite-preview.component';

describe('FavoritePreviewComponent', () => {
  let component: FavoritePreviewComponent;
  let fixture: ComponentFixture<FavoritePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
