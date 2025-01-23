import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-details',
  templateUrl: './sidebar-details.component.html',
  styleUrls: ['./sidebar-details.component.scss'],
  standalone: true,
  imports: [

    FormsModule
  ],
})
export class SidebarDetailsComponent {
  @Input() task: any;
  @Output() statusChange = new EventEmitter<string>();
}
