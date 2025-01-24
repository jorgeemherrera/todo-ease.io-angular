import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  dueDate: string;
  isOverdue?: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  checklist: ChecklistItem[];
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class TaskFormComponent implements OnChanges {
  @Input() initialData: any = {
    id: '',
    title: '',
    description: '',
    dueDate: '',
    status: 'Open',
    checklist: [],
  };
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  title: string = '';
  description: string = '';
  dueDate: string = '';
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue' = 'Open';
  checklist: ChecklistItem[] = [];
  error: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.title = this.initialData.title || '';
      this.description = this.initialData.description || '';
      this.dueDate = this.initialData.dueDate || '';
      this.status = this.initialData.status || 'Open';
      this.checklist = this.initialData.checklist || [];
    }
  }

  addChecklistItem(): void {
    this.checklist.push({ id: Date.now().toString(), label: '', checked: false, dueDate: '' });
  }

  removeChecklistItem(index: number): void {
    this.checklist.splice(index, 1);
  }

  saveTask(): void {
    if (!this.title.trim() || !this.description.trim()) {
      this.error = 'Los campos de título y descripción son obligatorios.';
      return;
    }
  
    const now = new Date().toISOString().split('T')[0];
    const isOverdue = this.dueDate && this.dueDate < now;
  
    const updatedTask: Task = {
      id: this.initialData.id || Date.now().toString(),
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      status: isOverdue ? 'Overdue' : this.status,
      checklist: this.checklist,
    };
    this.save.emit(updatedTask);
  }
}
