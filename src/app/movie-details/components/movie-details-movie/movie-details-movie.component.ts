import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { AppState } from 'src/app/app.store';
import { selectCurrentUserLogged } from 'src/app/auth/store/auth.selectors';
import {
  addMovieToFavorites,
  deleteFavorite,
} from 'src/app/favorites/store/favorites.actions';
import { loadLists } from 'src/app/lists/store/lists.actions';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MovieDetails } from '../../interfaces/responses/movie-details/movie-details.interface';
import {
  AddRating,
  AddToWatchlist,
  RemoveFromWatchList,
  RemoveRating,
} from '../../store/specific-movie.actions';
import { selectMovieAccountState } from '../../store/specific-movie.selectors';

@Component({
  selector: 'app-movie-details-movie',
  templateUrl: './movie-details-movie.component.html',
  styleUrls: ['./movie-details-movie.component.scss'],
})
export class MovieDetailsMovieComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  logged$!: Observable<boolean>;
  imagePath = 'https://image.tmdb.org/t/p/w500';
  imagePath2 = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';
  @Input() movie!: MovieDetails;
  favorite: boolean = false;
  rated: boolean = false;
  watchlist: boolean = false;
  rating = 0;
  ratingOpen = false;
  addListOpen = false;
  confirmDialog!: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.logged$ = this.store.select(selectCurrentUserLogged);
    this.subscription = this.store
      .select(selectMovieAccountState)
      .subscribe(accountState => {
        if (accountState) {
          this.favorite = accountState.favorite;
          this.watchlist = accountState.watchlist;
          if (accountState.rated === false) {
            this.rated = false;
            this.rating = 0;
          } else {
            this.rated = true;
            const val = accountState.rated.valueOf() as { value: number };
            this.rating = val.value;
          }
        }

      });
        this.loadUserLists()
      }
  

  loadUserLists() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.store.dispatch(loadLists())
      }
    });
  }

  watchlistClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.watchlist) {
          this.store.dispatch(AddToWatchlist({ payload: this.movie.id }));
        } else {
          this.openConfirmationDialog("Are you sure you want to remove movie from your watchlist?").subscribe(result => {
            if(result){
              this.store.dispatch(RemoveFromWatchList({ payload: this.movie.id }));
            }
          })
        }
      }
    });
  }

  favoriteClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        if (!this.favorite) {
          this.store.dispatch(addMovieToFavorites({ movieId: this.movie.id }));
        } else {
          this.openConfirmationDialog("Are you sure you want to remove movie from favorites?").subscribe(result => {
            if(result){
              this.store.dispatch(
                deleteFavorite({ favoriteMovieId: this.movie.id })
              );
            }
          })
        }
      }
    });
  }

  ratedClick() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.ratingOpen = !this.ratingOpen;
        this.addListOpen = false;
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  listClicked() {
    this.logged$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.addListOpen = !this.addListOpen;
        this.ratingOpen = false
      }
    });
  }

  openConfirmationDialog(question: string): Observable<boolean> {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
    });
    this.confirmDialog.componentInstance.dialogMessage =
      question;
    return this.confirmDialog.afterClosed();
  }
  
}
