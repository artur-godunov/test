import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from "@angular/cdk/portal";
import { Observable } from "rxjs";

import { DialogModule } from "./dialog.module";

@Injectable({
  providedIn: DialogModule
})
export class DialogService {

  constructor(
    public readonly dialog: MatDialog
  ) {}

  openDialog<T, D, R>(component: ComponentType<T>, data?: D): Observable<R | undefined> {
    const dialogRef = this.dialog.open(component, {
      width: '250px',
      data
    });

    return dialogRef.afterClosed();
  }
}
