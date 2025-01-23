import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
  standalone: true,
})
export class SidebarHeaderComponent {
  @Input() task: any;
}
