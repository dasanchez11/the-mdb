import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'src/app/home/interfaces/movies.interface';

@Pipe({
  name: 'movieItemsAverageRating'
})
export class MovieItemsAverageRatingPipe implements PipeTransform {

  transform(value: Movie[]): unknown {
    let averageRating = 0
    for(let movie of value){
      averageRating += movie.vote_average
    }
    averageRating = (averageRating / value.length) * 10
    return averageRating.toFixed(2);
  }

}
