import { Component } from '@angular/core';

@Component({
  selector: 'app-comments-card',
  templateUrl: './comments-card.component.html',
  styleUrls: ['./comments-card.component.scss']
})
export class CommentsCardComponent {
  step : number  = 0;
  comments!: Comment[];

  constructor(
  
  ) {}


  ngOnInit(): void {
      this.step = 0;
  }
  toggle(){

    this.step = (this.step + 1) %2;
  }
}
