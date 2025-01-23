import { createAction, props } from '@ngrx/store';
import { Task } from './task.state';

export const loadTasks = createAction('[Task] Load Tasks');

export const setTasks = createAction('[Task] Set Tasks', props<{ tasks: Task[] }>());
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const selectTask = createAction('[Task] Select Task', props<{ taskId: string | null }>());
export const updateTaskChecklist = createAction(
  '[Task] Update Task Checklist',
  props<{ taskId: string; checklistId: string; checked: boolean }>()
);
