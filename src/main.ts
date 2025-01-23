import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { taskReducer } from './app/features/tasks/task.reducer';
import { TaskEffects } from './app/features/tasks/task.effects';
import { Store } from '@ngrx/store';
import * as TaskActions from './app/features/tasks/task.actions';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
}).then((app) => {
  const store = app.injector.get(Store);
  store.dispatch(TaskActions.loadTasks());
});