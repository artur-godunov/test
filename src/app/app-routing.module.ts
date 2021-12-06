import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from "./modules/shared/components/errors/page-not-found/page-not-found.component";

import { AppLinksPath } from "./modules/shared/models/links";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppLinksPath.USERS
  },
  {
    path: AppLinksPath.USERS,
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: AppLinksPath.LEARNINGS,
    loadChildren: () => import('./modules/learnings/learnings.module').then(m => m.LearningsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
