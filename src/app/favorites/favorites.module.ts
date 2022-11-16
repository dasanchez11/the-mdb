import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesMainComponent } from './components/favorites-main/favorites-main.component';
import { FavoritesRoutingModule } from './favorites-router.module';

@NgModule({
  declarations: [
    FavoritesMainComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
