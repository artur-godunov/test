import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit, OnDestroy
} from '@angular/core';
import { merge, Subject } from "rxjs";
import { startWith, takeUntil } from "rxjs/operators";

import { ListItemElement } from "../list/list.model";
import { PageContentEvent } from "./page-content.model";

import { PaginationComponent } from "../pagination/pagination.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContentComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  @Input() pageTitle: string = '';

  @Input() createTitle: string = '';

  @Input() elements: ListItemElement[] = [];

  @Input() dataSource: any;

  @Input() pageLength: number = 0;

  @Output() create = new EventEmitter<void>();

  @Output() change = new EventEmitter<PageContentEvent>();

  @ViewChild(PaginationComponent) pagination: PaginationComponent | undefined;

  @ViewChild(SearchComponent) search: SearchComponent | undefined;

  pageSize: number = 5;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    merge(
      (this.pagination as PaginationComponent).page,
      (this.search as SearchComponent).change
    )
      .pipe(
        startWith({}),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.pageSize = (this.pagination as PaginationComponent).pageSize;

        this.change.emit({
          pageIndex: (this.pagination as PaginationComponent).pageIndex,
          pageSize: this.pageSize,
          search: (this.search as SearchComponent).value
        });
      })
  }

  createItem(): void {
    this.create.emit();
  }

  trackByFn(i: number, { id }: { id: string }): string {
    return id;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
