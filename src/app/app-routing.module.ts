import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainComponent } from './auth/components/auth-main/auth-main.component';
import { AuthRedirectComponent } from './auth/components/auth-redirect/auth-redirect.component';
import { FavoritesMainComponent } from './favorites/components/favorites-main/favorites-main.component';
import { HomeMainComponent } from './home/components/home-main/home-main.component';
import { ListDetailsComponent } from './lists/components/list-details/list-details.component';
import { ListsMainComponent } from './lists/components/lists-main/lists-main.component';
import { NewListComponent } from './lists/components/new-list/new-list.component';
import { ListsResolver } from './lists/resolvers/lists.resolver';
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
    path: 'authenticate',
    component: AuthRedirectComponent,
  },
  {
    path: 'favorites',
    component: FavoritesMainComponent,
  },
  {
    path: 'lists',
    component: ListsMainComponent
  },
  
  {
    path: 'lists/create',
    component: NewListComponent
  },
  {
    path: 'lists/:listId',
    component: ListDetailsComponent,
    resolve: { lists: ListsResolver}
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
