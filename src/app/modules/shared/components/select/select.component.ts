import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, Optional } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SelectItem } from "./select.model";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';

  @Input() formControlName?: string;

  @Input() formControl?: FormControl;

  @Input() items: SelectItem<any>[] = [];

  control = new FormControl();

  constructor(@Optional() private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    if (this.formControl || this.rootFormGroup) {
      this.control = this.formControl || this.rootFormGroup.control.get(this.formControlName as string) as FormControl;
    }
  }

  writeValue(value: string): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
