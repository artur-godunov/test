import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { PageContentModule } from "../shared/components/page-content/page-content.module";
import { DialogModule } from "../shared/components/dialog/dialog.module";
import { ButtonModule } from "../shared/components/button/button.module";

import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersLearningsDialogComponent } from './components/users-learnings-dialog/users-learnings-dialog.component';

@NgModule({
  declarations: [
    UsersPageComponent,
    UsersLearningsDialogComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageContentModule,
    DialogModule,
    ButtonModule
  ]
})
export class UsersModule { }
