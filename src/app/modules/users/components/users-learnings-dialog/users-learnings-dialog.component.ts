import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { UsersLearningsDialogData } from "./users-learnings-dialog.model";

@Component({
  selector: 'app-users-learnings-dialog',
  templateUrl: './users-learnings-dialog.component.html',
  styleUrls: ['./users-learnings-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersLearningsDialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<UsersLearningsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: UsersLearningsDialogData,
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
