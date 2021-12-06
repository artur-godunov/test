import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningsRoutingModule } from './learnings-routing.module';
import { LearningsPageComponent } from './pages/learnings-page/learnings-page.component';

import { PageContentModule } from "../shared/components/page-content/page-content.module";
import { DialogModule } from "../shared/components/dialog/dialog.module";
import { ButtonModule } from "../shared/components/button/button.module";
import { SelectModule } from "../shared/components/select/select.module";

import { LearningsAssignDialogComponent } from './components/learnings-assign-dialog/learnings-assign-dialog.component';

@NgModule({
  declarations: [
    LearningsPageComponent,
    LearningsAssignDialogComponent
  ],
  imports: [
    CommonModule,
    LearningsRoutingModule,
    PageContentModule,
    DialogModule,
    ButtonModule,
    SelectModule
  ]
})
export class LearningsModule { }
