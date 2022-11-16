import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsMainComponent } from './components/lists-main/lists-main.component';
import { ListsService } from './services/lists.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MovieslistsComponent } from './components/movieslists/movieslists.component';
import { ListPreviewComponent } from './components/list-preview/list-preview.component';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    ListsMainComponent,
    MovieslistsComponent,
    ListPreviewComponent,
    ListDetailsComponent,
    MovieComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedModule, AppRoutingModule],
  providers: [ListsService],
})
export class ListsModule {}
