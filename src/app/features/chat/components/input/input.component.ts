import { NgClass } from '@angular/common';
import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [NgClass],
  standalone: true,
})
export class InputComponent {
  @Input() command: string = '';
  @Input() commandText: string = '';
  @Output() commandChange = new EventEmitter<{ command: string; text: string }>();
  @Output() commandExecute = new EventEmitter<{ action: string; title: string }>();

  readonly inputValue = signal<string>('');
  readonly helpVisible = signal<boolean>(false);
  readonly deleteConfirmation = signal<boolean>(false);

  inputClass = computed(() => {
    const command = this.command.toLowerCase();
    if (command === 'crear') return 'crear';
    if (command === 'editar') return 'editar';
    if (command === 'borrar') return 'borrar';
    return '';
  });

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    const action = value.split(' ')[0].toUpperCase();
    const text = value.slice(action.length).trim();

    if (['CREAR', 'EDITAR', 'BORRAR'].includes(action)) {
      this.commandChange.emit({ command: action, text });
      this.helpVisible.set(false);
    } else {
      this.commandChange.emit({ command: '', text: '' });
      this.helpVisible.set(true);
    }

    if (action !== 'BORRAR') {
      this.deleteConfirmation.set(false);
    }
    this.inputValue.set(value);
  }

  onEnterPress(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    const [action, ...args] = value.split(' ');
    const title = args.join(' ').trim();
    const actionToUse = ['CREAR', 'EDITAR', 'BORRAR'].includes(action.toUpperCase())
      ? action.toUpperCase()
      : 'CREAR';
    const titleToUse = title || value;

    if (actionToUse === 'BORRAR' && !this.deleteConfirmation()) {
      this.deleteConfirmation.set(true);
      return;
    }

    this.commandExecute.emit({ action: actionToUse, title: titleToUse });
    this.inputValue.set('');
    this.commandChange.emit({ command: '', text: '' });
    this.deleteConfirmation.set(false);
  }

  onFocus() {
    this.helpVisible.set(true);
  }

  onBlur() {
    this.helpVisible.set(false);
  }
}
