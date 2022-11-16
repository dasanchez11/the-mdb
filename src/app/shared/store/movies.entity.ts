import { createEntityAdapter } from '@ngrx/entity';
import { Movie } from 'src/app/home/interfaces/movies.interface';
import { EntityState } from '@ngrx/entity';

export const movieAdapter = createEntityAdapter<Movie>();
export interface MovieState extends EntityState<Movie> {}
