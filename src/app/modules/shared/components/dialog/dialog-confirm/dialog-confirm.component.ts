import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { DialogConfirmData } from "./dialog-confirm.model";

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogConfirmComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: DialogConfirmData<any>,
  ) { }

  confirm(): void {
    this.dialogRef.close(this.data.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
