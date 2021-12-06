import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";

import { SelectComponent } from './select.component';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
