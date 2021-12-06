import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";

import { ListComponent } from './list.component';
import { ListItemComponent } from "./list-item/list-item.component";
import { ListItemContentComponent } from './list-item-content/list-item-content.component';

import { ButtonModule } from "../button/button.module";

@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    ListItemContentComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    ButtonModule
  ],
  exports: [
    ListComponent,
    ListItemComponent,
    ListItemContentComponent
  ]
})
export class ListModule { }
