import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsMainComponent } from './components/lists-main/lists-main.component';

const routes: Routes = [
  {
    path: '',
    component: ListsMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsRoutingModule { }
