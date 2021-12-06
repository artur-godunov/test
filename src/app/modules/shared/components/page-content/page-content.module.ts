import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContentComponent } from './page-content.component';

import { ButtonModule } from "../button/button.module";
import { ListModule } from "../list/list.module";
import { SearchModule } from "../search/search.module";
import { PaginationModule } from "../pagination/pagination.module";

@NgModule({
  declarations: [
    PageContentComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ListModule,
    SearchModule,
    PaginationModule
  ],
  exports: [
    PageContentComponent
  ]
})
export class PageContentModule { }
