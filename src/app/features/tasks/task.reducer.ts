import { createReducer, on } from '@ngrx/store';
import { initialTaskState, TaskState } from './task.state';
import * as TaskActions from './task.actions';
import { inject } from '@angular/core';
import { DbService } from '../../shared/services/db.service';

const db = inject(DbService);

export const taskReducer = createReducer(
  initialTaskState,
  on(TaskActions.setTasks, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TaskActions.addTask, (state, { task }) => {
    db.saveTask(task); // Persistir en IndexedDB
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    db.saveTask(task); // Persistir en IndexedDB
    return { ...state, tasks: updatedTasks };
  }),
  on(TaskActions.deleteTask, (state, { taskId }) => {
    db.deleteTask(taskId); // Eliminar de IndexedDB
    return {
      ...state,
      tasks: state.tasks.filter((task: any) => task.id !== taskId),
    };
  }),
  on(TaskActions.selectTask, (state, { taskId }) => ({
    ...state,
    selectedTaskId: taskId,
  })),
  on(TaskActions.updateTaskChecklist, (state, { taskId, checklistId, checked }) => {
    const updatedTasks = state.tasks.map((task: any) => {
      if (task.id === taskId) {
        const updatedChecklist = task.checklist.map((item: any) =>
          item.id === checklistId ? { ...item, checked } : item
        );
        return { ...task, checklist: updatedChecklist };
      }
      return task;
    });
    return { ...state, tasks: updatedTasks };
  })
);
