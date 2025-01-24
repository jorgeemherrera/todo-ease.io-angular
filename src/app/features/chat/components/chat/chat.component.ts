import { Component, signal, computed, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../tasks/task.state';
import { DbService } from '../../../../core/services/db.service';
import { ModalService } from '../../../../core/services/modal.service';
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { TaskListComponent } from "../task-list/task-list.component";
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, ChatHeaderComponent, TaskListComponent, InputComponent],
})
export class ChatComponent {
  
  @Input() tasks: Task[] = []; 
  @Output() selectTask = new EventEmitter<any>();

  searchQuery = signal<string>('');
  selectedFilter = signal<string>('all');
  command = signal<string>('');
  commandText = signal<string>('');
  
  tasksSignal = signal<Task[]>([]);

  readonly #modalService = inject(ModalService);
  readonly #dbService = inject(DbService);

  constructor() {
    this.#dbService.tasks$.subscribe((tasks) => {
      this.tasksSignal.set(tasks);
    });
  }

  filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.selectedFilter();
    return this.tasksSignal().filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(query);
      const isOverdue = task.dueDate && new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'overdue' && isOverdue) ||
        (filter === 'completed' && task.status === 'Completed') ||
        (filter === 'in-progress' && task.status === 'In Progress') ||
        (filter === 'open' && task.status === 'Open');
      return matchesSearch && matchesFilter;
    });
  });

  onTaskSelect(task: Task): void {
    this.selectTask.emit(task);
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery.set(query);
  }

  onSelectedFilterChange(filter: string): void {
    this.selectedFilter.set(filter);
  }

  onCommandChange({ command, text }: { command: string; text: string }): void {
    this.command.set(command);
    this.commandText.set(text);
  }


  onCommandExecute({ action, title }: { action: string; title: string }): void {
    if (action === 'CREAR') {
      this.#modalService.openModal();
    } else if (action === 'EDITAR') {
      const taskToEdit = this.tasksSignal().find((task) => task.title === title);
      if (taskToEdit) {
        this.#modalService.openModal({
          ...taskToEdit,
          description: taskToEdit.description || '',
          dueDate: taskToEdit.dueDate || '',
          checklist: taskToEdit.checklist.map((item: any) => ({ ...item, label: item.label || '' }))
        });
      }
    } else if (action === 'BORRAR') {
      const taskToDelete = this.tasksSignal().find((task) => task.title === title);
      if (taskToDelete) {
        this.#dbService.deleteTask(taskToDelete.id);
      }
    }
  }

  onEdit(taskId: string): void {
    const task: any = this.tasksSignal().find((t) => t.id === taskId);
    if (task) {
      this.#modalService.openModal(task);
    }
  }

  onDelete(taskId: string): void {
    this.#dbService.deleteTask(taskId);
  }

  onSelect(taskId: string): void {
    const selected = this.tasksSignal().find(task => task.id === taskId) || null;
    this.selectTask.emit(selected!);
    this.#dbService.setSelectedTaskId(taskId);
  }
}
