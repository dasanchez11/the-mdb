import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesMainComponent } from './components/favorites-main/favorites-main.component';
import { FavoritesGuard } from './favorites.guard';
import { FavoritesResolver } from './resolvers/favorites.resolver';

const routes: Routes = [
  {
    path: '',
    component: FavoritesMainComponent,
    canActivate: [FavoritesGuard],
    resolve: {
      favorites: FavoritesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
