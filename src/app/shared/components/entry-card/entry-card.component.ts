import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Entry,
  Category,
  EntryType,
  CategoryService,
} from 'src/app/core';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss'],
})
export class EntryCardComponent {
  @Input() entry!: Entry;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  getCategoryClass(category: Category): string[] {
    return this.categoryService.getCategoryClass(category);
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  navigateToDetails(): void {
    this.router.navigate([
      'entries',
      EntryType[this.entry.entry_type_id].toLowerCase(),
      this.entry.entry_id,
    ]);
  }
}
