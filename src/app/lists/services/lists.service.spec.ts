import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IListResponse } from '../interfaces/movie-lists-response.interface';

import { ListsService } from './lists.service';

const mockLists: IListResponse = {
  page: 1,
  results: [
    {
      created_by: 'Test',
      description: 'test',
      favorite_count: 1,
      id: 'string',
      items: [],
      item_count: 1,
      iso_639_1: 'test',
      name: 'test',
      poster_path: null,
      list_type: 'test',
    },
    {
      created_by: 'Test2',
      description: 'test2',
      favorite_count: 2,
      id: 'string',
      items: [],
      item_count: 2,
      iso_639_1: 'test',
      name: 'test',
      poster_path: null,
      list_type: 'test',
    },
  ],
  total_pages: 1,
  total_results: 1,
};

fdescribe('ListsService', () => {
  let service: ListsService;
  let httpTestingController: HttpTestingController;

  const snackBar = jasmine.createSpyObj('SnackBarService', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ListsService,
        { provide: SnackbarService, useValue: snackBar },
      ],
    });
    service = TestBed.inject(ListsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user lists', () => {
    service.getLoggedUserLists().subscribe(lists => {
      expect(lists).toBe(mockLists);
    });

    const request = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/account/15719412/lists?language=en-US&page=1'
    );
    expect(request.request.method).toEqual('GET');
    request.flush(mockLists);
  });
});
