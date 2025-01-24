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



	// deleteConfirmation: boolean = false;
  // helpVisible: boolean = false;

  // private deleteTimeout: any;

  // ngOnInit() {}

  // handleInput(event: Event): void {
	// 	const input = (event.target as HTMLInputElement).value.trim();
	// 	const action = input.split(' ')[0].toUpperCase();
	
	// 	if (['CREAR', 'EDITAR', 'BORRAR'].includes(action)) {
	// 		this.commandChange.emit({ command: action, text: input });
	// 		this.helpVisible = false;
	// 	} else {
	// 		this.commandChange.emit({ command: '', text: '' });
	// 		this.helpVisible = true;
	// 	}
	
	// 	if (action !== 'BORRAR') {
	// 		this.deleteConfirmation = false;
	// 	}
	// }

  // handleKeyDown(event: KeyboardEvent): void {
	// 	if (event.key === 'Enter') {
	// 		const input = event.target as HTMLInputElement;
	// 		const value = input.value.trim();
	// 		if (!value) return;
	
	// 		const [action, ...args] = value.split(' ');
	// 		const title = args.join(' ');
	
	// 		if (action.toUpperCase() === 'BORRAR') {
	// 			if (!this.deleteConfirmation) {
	// 				this.deleteConfirmation = true;
	// 				this.deleteTimeout = setTimeout(() => (this.deleteConfirmation = false), 5000);
	// 				return;
	// 			}
	// 		}
	
	// 		// Emitir un objeto con las propiedades action y title
	// 		this.commandExecute.emit({ action: action.toUpperCase(), title });
	
	// 		input.value = '';
	// 		this.commandChange.emit({ command: '', text: '' });
	// 		this.deleteConfirmation = false;
	// 	}
	// }

  // handleFocus(): void {
  //   this.helpVisible = true;
  // }

  // handleBlur(): void {
  //   this.helpVisible = false;
  // }

  // ngOnDestroy(): void {
  //   if (this.deleteTimeout) {
  //     clearTimeout(this.deleteTimeout);
  //   }
  // }

  
}
