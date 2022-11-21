import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeEffects } from './store/home/home.effects';
import { homeReducer } from './store/home/home.reducer';

@NgModule({
  declarations: [HomeMainComponent, HomeDiscoverComponent],
  imports: [
    NgOptimizedImage,
    MatCardModule,
    CommonModule,
    MatIconModule,
    InfiniteScrollModule,
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    HomeRoutingModule,
  ],
})
export class HomeModule {}
