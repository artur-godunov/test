import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, Optional, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FileInput } from "ngx-material-file-input";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() label: string = '';

  @Input() formControlName?: string;

  @Input() formControl?: FormControl;

  control = new FormControl();

  private onChange: any;

  private readonly destroy$ = new Subject<void>();

  constructor(@Optional() private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    if (this.formControl || this.rootFormGroup) {
      this.control = this.formControl || this.rootFormGroup.control.get(this.formControlName as string) as FormControl;
    }

    this.control.valueChanges
      .pipe(
        filter((value: FileInput | string) => value instanceof FileInput),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        const file = (value as FileInput).files[0];

        if (file) {
          this.toBase64(file, (result: string) => this.onChange(result))
        }
      })
  }

  private toBase64(file: File, callback: Function): void {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => callback(reader.result);

    reader.onerror = error => console.log('Error: ', error);
  }

  writeValue(value: string): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
