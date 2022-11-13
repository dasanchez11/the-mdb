import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainComponent } from './components/home-main/home-main.component';
import { HomeDiscoverComponent } from './components/home-discover/home-discover.component';



@NgModule({
  declarations: [
    HomeMainComponent,
    HomeDiscoverComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
