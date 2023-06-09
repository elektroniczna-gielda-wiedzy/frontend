import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.scss']
})
export class FavoriteIconComponent {
  
  @Input() 
  isFavorite: boolean = false;
  
  @Input()
  bigger: boolean = false;

  handleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
