import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Optional
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';

  @Input() formControlName?: string;

  @Input() formControl?: FormControl;

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
