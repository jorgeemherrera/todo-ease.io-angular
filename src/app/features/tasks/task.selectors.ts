import { createSelector } from '@ngrx/store';

export const selectTasks = (state: any) => state.tasks;
export const selectSelectedTask = createSelector(
  selectTasks,
  (tasks) => tasks.find((task: any) => task.id === tasks.selectedTaskId)
);
