import { ChecklistItem } from "./ChecklistItem";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | undefined;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  checklist: ChecklistItem[];
  createdAt: string;
}