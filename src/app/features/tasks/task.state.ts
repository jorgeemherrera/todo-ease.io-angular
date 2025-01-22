import { Task } from './task.model';

export interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
}

export const initialTaskState: TaskState = {
  tasks: [],
  selectedTaskId: null,
};
