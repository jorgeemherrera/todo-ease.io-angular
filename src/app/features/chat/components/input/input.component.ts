import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
})
export class InputComponent {
  @Input() command: string = '';
  @Input() commandText: string = '';
  @Output() commandChange = new EventEmitter<{ command: string; text: string }>();
  @Output() commandExecute = new EventEmitter<{ action: string; title: string }>();

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    const [action, ...args] = value.split(' ');
    const text = args.join(' ');
    this.commandChange.emit({ command: action.toUpperCase(), text });
  }

  onEnterPress(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    const [action, ...args] = value.split(' ');
    const title = args.join(' ').trim();
    let actionToUse = ['CREAR', 'EDITAR', 'BORRAR'].includes(action.toUpperCase()) ? action.toUpperCase() : 'CREAR';
    let titleToUse = title || value;

    this.commandExecute.emit({ action: actionToUse, title: titleToUse });
  }
}
