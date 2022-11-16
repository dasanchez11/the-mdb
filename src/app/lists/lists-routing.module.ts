import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { ListsMainComponent } from './components/lists-main/lists-main.component';

const routes: Routes = [
  {
    path: '',
    component: ListsMainComponent,
    children: [
      {
        path: '/:listId',
        component: ListDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
