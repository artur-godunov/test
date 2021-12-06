import { Validators } from "@angular/forms";

import { ListItemElementType } from "../../list/list.model";

export interface DialogCreateDataField {
  label: string;
  formControlName: string;
  validators: Validators[];
  type: ListItemElementType
}

export interface DialogCreateData {
  title: string;
  fields: DialogCreateDataField[];
}
