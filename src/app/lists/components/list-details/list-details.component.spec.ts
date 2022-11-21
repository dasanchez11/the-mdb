import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import { ListsService } from '../../services/lists.service';
import { ListDetailsComponent } from './list-details.component';

// const mockMovieList: IListDetails = {
//   created_by: 'test',
//   description: 'test',
//   favorite_count: 1,
//   id: '123',
//   items: [],
//   item_count: 1,
//   iso_639_1: 'test',
//   name: 'test',
//   poster_path: null,
// };
describe('ListDetailsComponent', () => {
  let component: ListDetailsComponent;
  let fixture: ComponentFixture<ListDetailsComponent>;
  let element: DebugElement;

  const listServiceSpy = jasmine.createSpyObj('ListsService', [
    'getListDetails',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { listId: mockMovieList.id } },
          },
        },
        {
          provide: ListsService,
          useValue: listServiceSpy,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    listServiceSpy.getListDetails.and.returnValue(of(mockMovieList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load list details', async () => {
    const title = element.query(By.css('.list-name'));
    expect(title.nativeElement.textContent.trim()).toEqual(mockMovieList.name);
    const description = element.query(By.css('.list-description'));
    expect(description.nativeElement.textContent.trim()).toEqual(
      mockMovieList.description
    );
  });

  it('should retrieve a list which id matches the id in the query params', () => {
    component.movieListDetails$.subscribe(response => {
      expect(response.id).toEqual(mockMovieList.id);
    });
  });
});
