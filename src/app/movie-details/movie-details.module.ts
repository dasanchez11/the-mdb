import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsMainComponent } from './components/movie-details-main/movie-details-main.component';
import { MovieDetailsRoutingModule } from './movie-details-routing.module';

@NgModule({
  declarations: [
    MovieDetailsMainComponent
  ],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule
  ]
})
export class MovieDetailsModule { }
