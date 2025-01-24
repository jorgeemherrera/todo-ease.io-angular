import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
})
export class ModalComponent {
  @Input() isOpen: boolean = false; 
  @Output() close = new EventEmitter<void>();

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
