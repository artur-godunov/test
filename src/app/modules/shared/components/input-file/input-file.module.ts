import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialFileInputModule } from "ngx-material-file-input";

import { InputFileComponent } from './input-file.component';

@NgModule({
  declarations: [
    InputFileComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  exports: [
    InputFileComponent
  ]
})
export class InputFileModule { }
