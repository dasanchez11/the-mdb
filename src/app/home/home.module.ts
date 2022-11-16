import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
    HomeMainComponent,
    HomeDiscoverComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
