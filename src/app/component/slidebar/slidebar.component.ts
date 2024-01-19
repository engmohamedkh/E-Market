import { Component } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {
  arr:string[]=['1','2','3']
  currentImg: string | undefined;
  i: number=1;
  next():void
  {
    this.currentImg = this.arr[this.i];
    if (this.i<this.arr.length){
      this.i++;
  }
}
  prev():void{
    this.currentImg = this.arr[this.i];
    if (this.i>0){
      this.i--;
  }
}
}
