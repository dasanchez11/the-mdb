import {
  FetchPlayingNowStart,
  FetchPopularStart,
  FetchTopRatedStart,
  FetchUpcomingStart,
} from 'src/app/home/store/home/home.actions';
import {
  FetchRecommendedStart,
  FetchSimilarStart,
} from 'src/app/movie-details/store/specific-movie.actions';

export type HomeStartActions =
  | typeof FetchPlayingNowStart
  | typeof FetchUpcomingStart
  | typeof FetchPopularStart
  | typeof FetchTopRatedStart;

export type SpecificStartActions =
  | typeof FetchSimilarStart
  | typeof FetchRecommendedStart;
