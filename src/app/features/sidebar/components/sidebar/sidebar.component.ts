import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { SidebarHeaderComponent } from "../sidebar-header/sidebar-header.component";
import { SidebarDetailsComponent } from "../sidebar-details/sidebar-details.component";
import { SidebarChecklistComponent } from "../sidebar-checklist/sidebar-checklist.component";
import { selectSelectedTask } from '../../../tasks/task.selectors';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../tasks/task.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarDetailsComponent, SidebarChecklistComponent, CommonModule],
})
export class SidebarComponent {
  selectedTask$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.selectedTask$ = this.store.select(selectSelectedTask);
  }
}
