import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LearningsPageComponent } from "./pages/learnings-page/learnings-page.component";

const routes: Routes = [
  {
    path: '',
    component: LearningsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningsRoutingModule { }
