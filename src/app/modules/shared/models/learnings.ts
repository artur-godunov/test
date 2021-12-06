export enum LearningsStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

export interface Learning {
  id: number;
  name: string;
  status: LearningsStatus;
}
