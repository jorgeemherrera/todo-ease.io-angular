import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DbService } from '../../../../core/services/db.service';

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
  createdAt: string;
}

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
  readonly dbService = inject(DbService)
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
      this.checklist = JSON.parse(JSON.stringify(this.initialData.checklist || []));
    }
  }

  addChecklistItem(): void {
    this.checklist.push({ id: Date.now().toString(), label: '', checked: false, dueDate: '' });
  }

  removeChecklistItem(index: number): void {
    if (index >= 0 && index < this.checklist.length) {
      this.checklist.splice(index, 1);
  
      const updatedTask = {
        ...this.initialData,
        checklist: this.checklist,
      };

      if (updatedTask.id) {
        this.dbService.saveTask(updatedTask).then(() => {
        }).catch((error) => {
          console.error(error);
        });
      }
  
      this.checklist = [...this.checklist];
    }
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
      createdAt: ''
    };
    this.save.emit(updatedTask);
  }
}
