import { ListItemElement, ListItemElementType } from "../../../shared/components/list/list.model";
import { User } from "../../../shared/models/user";
import { Validators } from "@angular/forms";

import { DialogCreateData } from "../../../shared/components/dialog/dialog-create/dialog-create.model";
import { DialogConfirmData } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.model";
import { UsersLearningsDialogData } from "../../components/users-learnings-dialog/users-learnings-dialog.model";

export const ELEMENTS = (remove: Function, info: Function): ListItemElement<User>[] => [
  {
    element: (user: User) => `${user.avatar}`,
    type: ListItemElementType.AVATAR
  },
  {
    element: (user: User) => `${user.name}`,
    type: ListItemElementType.TEXT
  },
  {
    element: (user: User) => `${user.email}`,
    type: ListItemElementType.TEXT
  },
  {
    element: (user: User) => remove(user),
    type: ListItemElementType.ACTION,
    actionTitle: 'REMOVE'
  },
  {
    element: (user: User) => info(user),
    type: ListItemElementType.ACTION,
    actionTitle: 'INFO',
    isHide: (user: User) => user.learnings?.length === 0
  },
];

export const DIALOG_CREATE_DATA: DialogCreateData = {
  title: 'User',
  fields: [
    {
      label: 'Avatar',
      formControlName: 'avatar',
      validators: [],
      type: ListItemElementType.AVATAR
    },
    {
      label: 'Name',
      formControlName: 'name',
      validators: [Validators.required],
      type: ListItemElementType.TEXT
    },
    {
      label: 'Email',
      formControlName: 'email',
      validators: [Validators.required, Validators.email],
      type: ListItemElementType.TEXT
    }
  ]
};

export const DIALOG_USERS_LEARNINGS_DATA: Omit<UsersLearningsDialogData, 'learnings'> = {
  title: 'Users Learnings'
};

export const DIALOG_CONFIRM_DATA = (name: string): Omit<DialogConfirmData<any>, 'data'> => ({
  title: `Are you sure you want to delete the user ${name}?`
});
