import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ListItemElement, ListItemElementType } from "../list.model";

@Component({
  selector: 'app-list-item-content',
  templateUrl: './list-item-content.component.html',
  styleUrls: ['./list-item-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemContentComponent {
  readonly LIST_ITEM_ELEMENT_TYPE = ListItemElementType;

  @Input() elements: ListItemElement[] = [];

  @Input() dataSource: any;
}
