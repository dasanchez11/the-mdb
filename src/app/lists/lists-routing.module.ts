import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListsMainComponent } from './components/lists-main/lists-main.component';

const routes: Routes = [
  {
    path: '',
    component: ListsMainComponent
  },
  {
    path: 'lists/:listId',
    component: ListDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsRoutingModule { }
