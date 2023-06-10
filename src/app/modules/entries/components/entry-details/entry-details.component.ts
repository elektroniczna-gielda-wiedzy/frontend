import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Category,
  CategoryService,
  Entry,
  EntryHttpService,
  EntryType,
  stringToEntryType,
} from 'src/app/core';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent {
  entryType!: EntryType;
  entry?: Entry;
  private entrySubscription: Subscription | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.entryType = stringToEntryType(
      this.route.snapshot.paramMap.get('entryType')!
    );
    this.loadEntry();
  }

  ngOnDestroy(): void {
    if (this.entrySubscription) {
      this.entrySubscription.unsubscribe();
    }
  }

  getCategoryClass(category: Category): string[] {
    return this.categoryService.getCategoryClass(category);
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  loadEntry(): void {
    // TODO: change to entryHttpService.getEntry
    if (this.entryType !== null) {
      this.entrySubscription = this.entryHttpService
        .getEntries({ type: this.entryType })
        .subscribe((response) => {
          this.entry = response.result.find(
            (entry) =>
              entry.entry_id === Number(this.route.snapshot.paramMap.get('id'))
          );
          console.log(this.entry);
        });
    }
  }

  handleFavorite(e: MouseEvent) {
    e.stopPropagation();
    if (!this.entry) return;
    this.entry.favorite = !this.entry?.favorite;
  }
}
