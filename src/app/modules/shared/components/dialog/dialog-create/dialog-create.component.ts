import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { DialogCreateData, DialogCreateDataField } from "./dialog-create.model";
import { ListItemElementType } from "../../list/list.model";

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogCreateComponent implements OnInit {
  form: FormGroup | any;

  readonly LIST_ITEM_ELEMENT_TYPE = ListItemElementType;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: DialogCreateData,
  ) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const controlsConfig: Record<string, any> = this.data.fields.reduce(
      (fieldsAcc: Record<string, any>, field: DialogCreateDataField) => ({
        ...fieldsAcc,
        ...{ [field.formControlName]: ['', field.validators] }
      }), {})

    return this.formBuilder.group(controlsConfig);
  }

  submit(form: FormGroup): void {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
