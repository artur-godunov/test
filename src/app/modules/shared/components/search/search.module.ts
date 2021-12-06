import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchComponent } from './search.component';

import { InputModule } from "../input/input.module";

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
