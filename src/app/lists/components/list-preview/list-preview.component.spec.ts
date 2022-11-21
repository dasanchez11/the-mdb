import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IListDetails } from '../../interfaces/list-details-response.interface';

import { ListPreviewComponent } from './list-preview.component';

const mockList : IListDetails = {
  created_by: "creator",
  items: [],
  description: 'test',
  favorite_count: 1,
  id: '1',
  item_count: 1,
  iso_639_1: 'test',
  list_type: 'test',
  name: 'test',
  poster_path: 'path',
};

describe('ListPreviewComponent', () => {
  let component: ListPreviewComponent;
  let fixture: ComponentFixture<ListPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPreviewComponent);
    component = fixture.componentInstance;
    component.list = mockList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
