import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../tasks/task.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() selectTask = new EventEmitter<Task>();
  
  onTaskSelect(task: Task): void {
    this.selectTask.emit(task);
  }

  onDeleteTask(taskId: string): void {
    this.delete.emit(taskId);
  }
}
