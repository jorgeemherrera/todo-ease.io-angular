import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { DbService } from '../../shared/services/db.service';
import { catchError, from, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TaskEffects {
  readonly #actions = inject(Actions);
  readonly #dbService = inject(DbService);

  loadTasks$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        from(this.#dbService.getTasks()).pipe(
          map((tasks) => {
            console.log('Tareas cargadas desde IndexedDB:', tasks);
            return TaskActions.setTasks({ tasks });
          }),
          catchError((error) => {
            console.error('Error al cargar tareas:', error);
            return of(TaskActions.setTasks({ tasks: [] }));
          })
        )
      )
    )
  );
  
  addTask$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) =>
        from(this.#dbService.saveTask(task)).pipe(
          map(() => TaskActions.addTask({ task })),
          catchError((error) => {
            console.error('Error al guardar tarea:', error);
            return of();
          })
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        from(this.#dbService.saveTask(task)).pipe(
          map(() => TaskActions.updateTask({ task })),
          catchError((error) => {
            console.error('Error al actualizar tarea:', error);
            return of();
          })
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.#actions.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ taskId }) =>
        from(this.#dbService.deleteTask(taskId)).pipe(
          map(() => TaskActions.deleteTask({ taskId })),
          catchError((error) => {
            console.error('Error al eliminar tarea:', error);
            return of();
          })
        )
      )
    )
  );
}
