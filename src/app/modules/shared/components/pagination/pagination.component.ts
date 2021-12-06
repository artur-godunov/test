import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() pageIndex: number = 0;

  @Input() length: number = 0;

  @Input() pageSize: number = 50;

  @Input() pageSizeOptions: number[] = [5, 10, 20, 100];

  @Output() page = new EventEmitter<PageEvent>();

  change(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.length = event.length
    this.pageSize = event.pageSize

    this.page.emit(event);
  }
}
