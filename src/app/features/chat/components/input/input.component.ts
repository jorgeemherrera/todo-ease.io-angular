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

  onEnterPress(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.trim();
    const [action, ...args] = value.split(' ');
    const title = args.join(' ');
  
    if (action.toUpperCase() === 'CREAR') {
      this.commandExecute.emit({ action: 'CREAR', title });
    } else if (action.toUpperCase() === 'EDITAR') {
      this.commandExecute.emit({ action: 'EDITAR', title });
    } else if (action.toUpperCase() === 'BORRAR') {
      this.commandExecute.emit({ action: 'BORRAR', title });
    } else {
      this.commandExecute.emit({ action: 'CREAR', title });
    }
  }
  
}
