import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { selectCurrentUser } from 'src/app/auth/store/auth.selectors';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { User } from '../../../auth/interfaces/responses/get-account-response';
import { selectFavoriteMovies } from '../../store/favorites.selectors';
import { MockFavoritesPreviewComponent } from '../../tests/mock-components/favorite-preview-mock.component';
import { FavoritesMainComponent } from './favorites-main.component';

const userMock: User = {
  avatar: {
    gravatar: {
      hash: 'asdasd',
    },
  },
  id: 1,
  iso_639_1: 'test',
  iso_3166_1: 'test',
  name: 'test name',
  include_adult: false,
  username: 'username',
};

const mockMovieList: Movie[] = [
  {
    poster_path: 'test',
    adult: false,
    overview: 'test',
    release_date: '09-11-2022',
    genre_ids: [1, 2, 3],
    id: 1,
    original_title: 'test',
    original_language: 'test',
    title: 'test',
    backdrop_path: 'test',
    popularity: 100,
    vote_count: 10,
    video: false,
    vote_average: 8,
  },
  {
    poster_path: 'test 2',
    adult: false,
    overview: 'test 2',
    release_date: '09-11-2022',
    genre_ids: [1, 2, 3],
    id: 2,
    original_title: 'test',
    original_language: 'test',
    title: 'test',
    backdrop_path: 'test',
    popularity: 100,
    vote_count: 10,
    video: false,
    vote_average: 9,
  },
];

describe('FavoritesMainComponent', () => {
  let component: FavoritesMainComponent;
  let fixture: ComponentFixture<FavoritesMainComponent>;
  let element: DebugElement;
  let favoritePreviewComponent: MockFavoritesPreviewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [FavoritesMainComponent, MockFavoritesPreviewComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCurrentUser,
              value: userMock,
            },
            {
              selector: selectFavoriteMovies,
              value: mockMovieList,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesMainComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logged user information correctly', () => {
    const firstUsernameLetter = element.query(By.css('.username__firstl'));
    expect(firstUsernameLetter.nativeElement.textContent.trim()).toEqual(
      userMock.username.slice(0, 1).toUpperCase()
    );
    const username = element.query(By.css('.username'));
    expect(username.nativeElement.textContent.trim()).toEqual(
      userMock.username
    );
  });

  it('should render the correct amount of favorite movies', () => {
    const favoritePreviews = element.queryAll(
      By.directive(MockFavoritesPreviewComponent)
    );
    expect(favoritePreviews.length).toEqual(mockMovieList.length);
  });

  it('should pass the correct movie to favorite preview element', () => {
    const favoritePreviewComponentElement = element.query(
      By.directive(MockFavoritesPreviewComponent)
    );
    favoritePreviewComponent = favoritePreviewComponentElement.injector.get(
      MockFavoritesPreviewComponent
    );
    expect(favoritePreviewComponent.movie).toBe(mockMovieList[0]);
  });
});
