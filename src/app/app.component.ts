import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StartNavComponent } from './component/start-nav/start-nav.component';
import { MidNavComponent } from './component/mid-nav/mid-nav.component';
import { PagesNavComponent } from './component/pages-nav/pages-nav.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AllPageCardComponent } from './component/all-page-card/all-page-card.component';
import { SearchResultComponent } from './component/search-result/search-result.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,StartNavComponent,MenubarComponent,ContactusComponent,AllPageCardComponent,
    AboutUsComponent,HomeComponent,MidNavComponent,MenubarComponent,
    PagesNavComponent,FooterComponent,SearchResultComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'onlineShop';
}
