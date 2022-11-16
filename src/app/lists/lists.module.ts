import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListPreviewComponent } from './components/list-preview/list-preview.component';
import { ListsMainComponent } from './components/lists-main/lists-main.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieslistsComponent } from './components/movieslists/movieslists.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { ListsService } from './services/lists.service';

@NgModule({
  declarations: [
    ListsMainComponent,
    MovieslistsComponent,
    ListPreviewComponent,
    ListDetailsComponent,
    MovieComponent,
    NewListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ListsService],
})
export class ListsModule {}
