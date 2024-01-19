import { Component } from '@angular/core';

@Component({
  selector: 'app-start-nav',
  standalone: true,
  imports: [],
  templateUrl: './start-nav.component.html',
  styleUrl: './start-nav.component.css'
})
export class StartNavComponent {
  hoverText: string = '';

  onLinkHover(text: string): void {
    this.hoverText = text;
  }

  onLinkLeave(): void {
    this.hoverText = '';
  }
}
