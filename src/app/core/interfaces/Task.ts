export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  checklist: { id: string; label: string; checked: boolean; dueDate?: string }[];
}