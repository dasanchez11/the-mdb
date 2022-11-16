import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { AuthRedirectComponent } from './components/auth-redirect/auth-redirect.component';

const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent
  },
  {
    path: 'authenticate',
    component: AuthRedirectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
