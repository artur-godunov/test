export enum ListItemElementType {
  TEXT,
  AVATAR,
  ACTION
}

export interface ListItemElement<T = any> {
  element: (value: any) => any;
  type: ListItemElementType;
  actionTitle?: string;
  actionTitleFn?: (value: any) => string;
  isHide?: (data: T) => boolean;
}
