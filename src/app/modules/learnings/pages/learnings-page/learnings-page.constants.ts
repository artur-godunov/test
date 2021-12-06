import { ListItemElement, ListItemElementType } from "../../../shared/components/list/list.model";
import { Validators } from "@angular/forms";

import { DialogCreateData } from "../../../shared/components/dialog/dialog-create/dialog-create.model";
import { DialogConfirmData } from "../../../shared/components/dialog/dialog-confirm/dialog-confirm.model";
import { Learning, LearningsStatus } from "../../../shared/models/learnings";
import { LearningsAssignDialogData } from "../../components/learnings-assign-dialog/learnings-assign-dialog.model";

export const ELEMENTS = (
  remove: Function, changeStatus: Function, assign: Function
): ListItemElement<Learning>[] => [
  {
    element: (learning: Learning) => `${learning.name}`,
    type: ListItemElementType.TEXT
  },
  {
    element: (learning: Learning) => `${learning.status}`,
    type: ListItemElementType.TEXT
  },
  {
    element: (learning: Learning) => remove(learning),
    type: ListItemElementType.ACTION,
    actionTitle: 'REMOVE'
  },
  {
    element: (learning: Learning) => changeStatus(learning),
    type: ListItemElementType.ACTION,
    actionTitleFn: (learning: Learning) => learning.status === LearningsStatus.ACTIVE ? 'ARCHIVE' : 'UNARCHIVE'
  },
  {
    element: (learning: Learning) => assign(learning),
    type: ListItemElementType.ACTION,
    actionTitle: 'ASSIGN'
  },
];

export const DIALOG_CREATE_DATA: DialogCreateData = {
  title: 'Learning',
  fields: [
    {
      label: 'Name',
      formControlName: 'name',
      validators: [Validators.required],
      type: ListItemElementType.TEXT
    }
  ]
};

export const DIALOG_ASSIGN_DATA: Omit<LearningsAssignDialogData, 'learningId' | 'users'> = {
  title: 'Assign Users'
};

export const DIALOG_CONFIRM_DATA = (name: string): Omit<DialogConfirmData<any>, 'data'> => ({
  title: `Are you sure you want to delete the learning ${name}?`
});
