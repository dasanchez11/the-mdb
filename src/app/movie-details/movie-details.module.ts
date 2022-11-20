import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MovieDetailsMainComponent } from './components/movie-details-main/movie-details-main.component';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsMovieComponent } from './components/movie-details-movie/movie-details-movie.component';
import { MovieDetailsReviewsComponent } from './components/movie-details-reviews/movie-details-reviews.component';
import { MovieDetailsRecomendationsComponent } from './components/movie-details-recomendations/movie-details-recomendations.component';
import { MovieDetailsSimilarComponent } from './components/movie-details-similar/movie-details-similar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MovieDetailsCircleComponent } from './components/movie-details-circle/movie-details-circle.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { specificMoviesReducer } from './store/specific-movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SpecificMovieEffects } from './store/specific-movie.effects';

@NgModule({
  declarations: [
    MovieDetailsMainComponent,
    MovieDetailsMovieComponent,
    MovieDetailsReviewsComponent,
    MovieDetailsRecomendationsComponent,
    MovieDetailsSimilarComponent,
    MovieDetailsCircleComponent,
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
    StoreModule.forFeature('specificMovie', specificMoviesReducer),
    EffectsModule.forFeature([SpecificMovieEffects]),
  ],
})
export class MovieDetailsModule {}
