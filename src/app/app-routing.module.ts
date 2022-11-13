import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainComponent } from './auth/components/auth-main/auth-main.component';
import { FavoritesMainComponent } from './favorites/components/favorites-main/favorites-main.component';
import { HomeMainComponent } from './home/components/home-main/home-main.component';
import { ListsMainComponent } from './lists/components/lists-main/lists-main.component';
import { MovieDetailsMainComponent } from './movie-details/components/movie-details-main/movie-details-main.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeMainComponent,
  },
  {
    path: 'login',
    component: AuthMainComponent,
  },
  {
    path: 'favorites',
    component: FavoritesMainComponent,
  },
  {
    path: 'lists',
    component: ListsMainComponent,
  },
  {
    path: 'movies',
    component: MovieDetailsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
