import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

import { LearningsAssignDialogData } from "./learnings-assign-dialog.model";
import { SelectItem } from "../../../shared/components/select/select.model";
import { User } from "../../../shared/models/user";

@Component({
  selector: 'app-learnings-assign-dialog',
  templateUrl: './learnings-assign-dialog.component.html',
  styleUrls: ['./learnings-assign-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningsAssignDialogComponent implements OnInit {
  formControl = new FormControl();

  items: SelectItem<User>[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<LearningsAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: LearningsAssignDialogData,
  ) { }

  ngOnInit(): void {
    this.formControl = new FormControl(this.getAssignedUsers(this.data.learningId, this.data.users));

    this.items = this.data.users.map((user: User) => ({
      value: user,
      title: user.name
    }));
  }

  private getAssignedUsers(learningId: number, users: User[]): User[] {
    return users.filter((user: User) => user.learnings.includes(learningId));
  }

  assign(): void {
    const selectedUsers: User[] = this.formControl.value;

    const updatedUsers: User[] = this.data.users
      .reduce((usersAcc: User[], user: User) => {
        const selectedUser: User | undefined = selectedUsers.find((selectedUser: User) => selectedUser.id === user.id);

        if (user.learnings.includes(this.data.learningId) !== Boolean(selectedUser)) {
          return usersAcc.concat([selectedUser
            ? {
              ...selectedUser,
              learnings: [ ...selectedUser.learnings, ...[this.data.learningId] ]
            }
            : {
              ...user,
              learnings: user.learnings.filter((learning: number) => learning !== this.data.learningId)
            }
          ]);
        }

        return usersAcc;
      }, []);

    this.dialogRef.close(updatedUsers);
  }

  close(): void {
    this.dialogRef.close();
  }
}
