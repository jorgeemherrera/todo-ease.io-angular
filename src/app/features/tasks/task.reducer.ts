import { createReducer, on } from '@ngrx/store';
import { initialTaskState, TaskState } from './task.state';
import * as TaskActions from './task.actions';

export const taskReducer = createReducer(
  initialTaskState,
  on(TaskActions.setTasks, (state, { tasks }) => ({
    ...state,
    tasks,
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.updateTask, (state, { task }) => {
    const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    return { ...state, tasks: updatedTasks };
  }),
  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),
  on(TaskActions.selectTask, (state, { taskId }) => ({
    ...state,
    selectedTaskId: taskId,
  })),
  on(TaskActions.updateTaskChecklist, (state, { taskId, checklistId, checked }) => {
    const updatedTasks = state.tasks.map((task) => {
      if (task.id === taskId) {
        const updatedChecklist = task.checklist.map((item) =>
          item.id === checklistId ? { ...item, checked } : item
        );
        return { ...task, checklist: updatedChecklist };
      }
      return task;
    });
    return { ...state, tasks: updatedTasks };
  })
);
