import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserComponent} from './components/user/user.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id',
    component: UserComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
