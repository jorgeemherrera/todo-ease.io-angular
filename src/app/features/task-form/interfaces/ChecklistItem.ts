export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  dueDate?: string;
  isOverdue?: boolean;
}
