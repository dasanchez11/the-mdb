import { MovieItemsAverageRatingPipe } from './movie-items-average-rating.pipe';

describe('MovieItemsAverageRatingPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieItemsAverageRatingPipe();
    expect(pipe).toBeTruthy();
  });
});
