import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  items = [
    { id: 'support', title: 'Support 24/7', content: 'Contact us anytime', isCollapsed: true },
    { id: 'quality', title: 'Best Quality', content: 'We make sure our products are top quality', isCollapsed: true },
    { id: 'delivery', title: 'Fastest Delivery', content: 'Our delivery schedules are sharp!', isCollapsed: true },
    { id: 'care', title: 'Customer Care', content: 'All of our customers are satisfied', isCollapsed: true },
  ];

  toggleCollapse(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.isCollapsed = !item.isCollapsed;
    }
  }
}
