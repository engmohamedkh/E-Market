import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, CartComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnDestroy, AfterViewInit, OnInit {

  @Input() showTimer: boolean = true;

  gridSize: string = '';
  desc = ['1', '2', '3', '4', '5', '6', '7'];
  start_co: number = 0;
  end_co: number = 4;
  head: string = 'ON SALE';
  new: boolean = true;
  sale: boolean = true;
  bestseller: boolean = true;
  conter: number = 1;
  choice: Date = new Date(2024, 0, 19, 12, 0, 0);
  currentDateTime: Date = new Date();
  timeDifference = this.choice.getTime() - this.currentDateTime.getTime();
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  private intervalId: any;
  private descSubject = new BehaviorSubject<string[]>([]);
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private ngZone: NgZone
  ) {
    this.days = Math.floor(this.timeDifference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (this.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.minutes = Math.floor(
      (this.timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.seconds = Math.floor((this.timeDifference % (1000 * 60)) / 1000);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.detectGridSize(window.innerWidth);
      this.calculateRange();
    }
    this.ngZone.runOutsideAngular(() => {
      this.startTimer();
    });
  }
  ngAfterViewInit(): void {
    //console.log("Component ngAfterViewInit called");
    //this.run();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  startTimer() {
    this.intervalId = setInterval(() => {
      this.ngZone.run(() => this.calculateTimeDifference());
    }, 1000);
  }
  hideTimer():boolean
  {
    if(this.seconds<0)
    return false
    else
    return true
  }
  private calculateTimeDifference(): void {
    this.currentDateTime = new Date();
    this.timeDifference =
      this.choice.getTime() - this.currentDateTime.getTime();
    this.days = Math.floor(this.timeDifference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (this.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.minutes = Math.floor(
      (this.timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    this.seconds = Math.floor((this.timeDifference % (1000 * 60)) / 1000);
    // console.log(this.seconds);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      this.detectGridSize((event.target as Window).innerWidth);
      this.calculateRange();
    }
  }

  private detectGridSize(width: number): void {
    if (width >= 1200) {
      this.gridSize = 'lg';
    } else if (width >= 992 && width < 1200) {
      this.gridSize = 'md';
    } else if (width >= 768 && width < 992) {
      this.gridSize = 'sm';
    }
  }

  private calculateRange(): void {
    if (this.gridSize == 'lg') {
      this.start_co = Math.max(
        Math.min(this.start_co, this.desc.length - 4),
        0
      );
      this.end_co = Math.min(this.start_co + 4, this.desc.length);
    } else if (this.gridSize == 'md') {
      this.start_co = Math.max(
        Math.min(this.start_co, this.desc.length - 3),
        0
      );
      this.end_co = Math.min(this.start_co + 3, this.desc.length);
    } else {
      this.start_co = Math.max(
        Math.min(this.start_co, this.desc.length - 2),
        0
      );
      this.end_co = Math.min(this.start_co + 2, this.desc.length);
    }

    this.descSubject.next(this.desc.slice(this.start_co, this.end_co));
  }

  getVisibleDesc$() {
    return this.descSubject.asObservable();
  }

  next(): void {
    if (this.end_co != this.desc.length) {
      this.start_co++;
      this.end_co++;
      this.calculateRange();
    }
  }

  prev(): void {
    if (this.start_co != 0) {
      this.start_co--;
      this.end_co--;
      this.calculateRange();
    }
  }

  items:any
  

}
