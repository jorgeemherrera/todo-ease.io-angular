import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../../../core/services/db.service';
import { Task } from '../../interfaces/Task';
import { ChecklistItem } from '../../interfaces/ChecklistItem';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class TaskFormComponent implements OnChanges {
  @Input() initialData: Task = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    status: 'Open',
    checklist: [],
    createdAt: '',
  };
  
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  readonly title = signal('');
  readonly description = signal('');
  readonly dueDate = signal('');
  readonly status = signal<'Open' | 'In Progress' | 'Completed' | 'Overdue'>('Open');
  readonly checklist = signal<ChecklistItem[]>([]);
  readonly error = signal<string>('');
  readonly dbService = inject(DbService);

  ngOnChanges(): void {
    this.#initializeForm();
  }

  #initializeForm(): void {
    if (this.initialData) {
      this.title.set(this.initialData.title || '');
      this.description.set(this.initialData.description || '');
      this.dueDate.set(this.initialData.dueDate || '');
      this.status.set(this.initialData.status || 'Open');
      this.checklist.set(
        this.initialData.checklist.map(item => ({
          ...item,
          dueDate: item.dueDate || '',
        })) || []
      );
    }
  }

  addChecklistItem(): void {
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      label: '',
      checked: false,
      dueDate: '',
    };
    this.checklist.update(list => [...list, newItem]);
  }

  removeChecklistItem(index: number): void {
    if (index >= 0 && index < this.checklist().length) {
      this.checklist.update(list => list.filter((_, i) => i !== index));

      const updatedTask: Task = {
        ...this.initialData,
        checklist: this.checklist(),
      };

      this.dbService.saveTask(updatedTask).catch(error => console.error(error));
    }
  }

  saveTask(): void {
    if (!this.title().trim() || !this.description().trim()) {
      this.error.set('Los campos de título y descripción son obligatorios.');
      return;
    }

    const now = new Date().toISOString().split('T')[0];
    const isOverdue = this.dueDate() && this.dueDate() < now;

    const updatedTask: Task = {
      id: this.initialData.id || Date.now().toString(),
      title: this.title(),
      description: this.description(),
      dueDate: this.dueDate(),
      status: isOverdue ? 'Overdue' : this.status(),
      checklist: this.checklist(),
      createdAt: '',
    };

    this.save.emit(updatedTask);
  }
}
