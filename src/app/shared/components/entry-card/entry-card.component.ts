import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Entry, Category, EntryType, Language } from 'src/app/core';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss'],
})
export class EntryCardComponent {
  @Input() entry!: Entry;
  language = Language.Polish;

  constructor(private router: Router) { }

  getCategoryClass(category: {
    category_id: number;
    type: number;
    parent_id: number | null;
    names: { lang_id: number; name: string }[];
  }): string[] {
    const result: string[] = ['category'];

    if (category.parent_id !== null) {
      category.type === 1 ? result.push('subarea') : result.push('major');
    }
    category.type === 1 ? result.push('area') : result.push('faculty');
    return result;
  }

  getCategoryName(category: Category) {
    return category.names.find((name) => name.lang_id === this.language)?.name;
  }

  navigateToDetails(): void {
    this.router.navigate([
      'entries',
      EntryType[this.entry.entry_type_id].toLowerCase(),
      this.entry.entry_id,
    ]);
  }
  
  handleFavorite(e: MouseEvent) {
    e.stopPropagation();
    this.entry.favorite = !this.entry.favorite;
  }
}
