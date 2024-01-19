import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
}}
