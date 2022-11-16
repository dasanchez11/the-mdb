import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsMainComponent } from './components/lists-main/lists-main.component';
import { ListsRoutingModule } from './lists-routing.module';



@NgModule({
  declarations: [
    ListsMainComponent
  ],
  imports: [
    CommonModule,
    ListsRoutingModule
  ]
})
export class ListsModule { }
