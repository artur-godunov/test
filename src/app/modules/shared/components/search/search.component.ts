import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly formControl = new FormControl();

  @Output() change = new EventEmitter<string>();

  @Input() label: string = 'Search';

  @Input() value: string = '';

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value: string) => {
        this.value = value;

        this.change.emit(value);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
