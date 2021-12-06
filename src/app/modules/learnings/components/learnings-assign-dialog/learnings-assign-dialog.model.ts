import { User } from "../../../shared/models/user";

export interface LearningsAssignDialogData {
  title: string;
  learningId: number;
  users: User[];
}
