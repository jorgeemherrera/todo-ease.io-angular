import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ChatComponent } from '../chat/components/chat/chat.component';
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
