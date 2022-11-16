<<<<<<< src/app/home/home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './store/home/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/home/home.effects';
import { HomeCarrouselComponent } from './components/home-carrousel/home-carrousel.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { CircleComponent } from './components/home-card/components/circle/circle.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeRoutingModule } from './home-routing.module';


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
    MatIconModule,
    InfiniteScrollModule,
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    HomeRoutingModule
  ]
})
export class HomeModule {}
