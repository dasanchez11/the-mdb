import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListsMainComponent } from './components/lists-main/lists-main.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { ListGuard } from './list.guard';
import { ListDetailsResolver } from './resolvers/list-details.resolver';
import { ListsResolver } from './resolvers/lists.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListsMainComponent,
    canActivate: [ListGuard],
    resolve: {
      lists: ListsResolver,
    },
  },
  {
    path: 'lists/:listId',
    component: ListDetailsComponent,
    resolve: {
      details: ListDetailsResolver,
    },
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
