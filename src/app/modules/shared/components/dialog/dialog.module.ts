import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";

import { InputModule } from "../input/input.module";
import { ButtonModule } from "../button/button.module";
import { InputFileModule } from "../input-file/input-file.module";

import { DialogCreateComponent } from './dialog-create/dialog-create.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    DialogCreateComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    InputModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputFileModule
  ],
  exports: [
    DialogCreateComponent,
    DialogConfirmComponent
  ]
})
export class DialogModule { }
