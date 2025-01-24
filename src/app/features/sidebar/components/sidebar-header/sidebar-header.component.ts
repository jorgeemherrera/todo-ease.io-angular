import { Component, Input } from '@angular/core';
import { Task } from '../../../tasks/task.state';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
  standalone: true,
})
export class SidebarHeaderComponent {
  @Input() task!: Task;

}
