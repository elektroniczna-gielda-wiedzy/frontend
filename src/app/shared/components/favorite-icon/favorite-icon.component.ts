import { Component, Input } from '@angular/core';
import { EntryHttpService } from 'src/app/core';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.scss']
})
export class FavoriteIconComponent {
  
  @Input() 
  isFavorite: boolean = false;
  @Input()
  entryId?: number;
  
  @Input()
  bigger: boolean = false;

  constructor(private entryHttpService: EntryHttpService) { }

  handleFavorite() {
    if (!this.entryId) {
      return;
    } 
    this.entryHttpService.setFavorite(this.entryId, 
      this.isFavorite ? -1 : 1
      ).subscribe((res) => {
      if (res.success) {
        this.isFavorite = !this.isFavorite;
      }
    });
  }
}
