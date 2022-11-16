import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';
import { StoreModule } from '@ngrx/store';
import { homReducer } from './store/home/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/home/home.effects';
import { HomeCarrouselComponent } from './components/home-carrousel/home-carrousel.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { CircleComponent } from './components/home-card/components/circle/circle.component';
@NgModule({
  declarations: [
    HomeMainComponent,
    HomeDiscoverComponent,
    HomeCarrouselComponent,
    HomeCardComponent,
    CircleComponent,
  ],
  imports: [
    NgOptimizedImage,
    MatCardModule,
    CommonModule,
    InfiniteScrollModule,
    StoreModule.forFeature('home', homReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
