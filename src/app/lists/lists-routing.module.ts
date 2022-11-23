import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListsMainComponent } from './components/lists-main/lists-main.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { ListGuard } from './list.guard';

const routes: Routes = [
  {
    path: '',
    component: ListsMainComponent,
    canActivate: [ListGuard],
  },
  {
    path: 'lists/:listId',
    component: ListDetailsComponent,
  },
  {
    path: 'create',
    component: NewListComponent,
  },
  {
    path: 'create/:movieId',
    component: NewListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsRoutingModule {}
