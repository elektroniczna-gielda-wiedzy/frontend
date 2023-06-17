import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Entry,
  Category,
  EntryType,
  CategoryService,
  Language,
} from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss'],
})
export class EntryCardComponent implements OnInit, OnDestroy {
  @Input() entry!: Entry;
  @Input() myEntries = false;
  @Output() entryDeleted = new EventEmitter<number>();

  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private languageService: LanguageService
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

  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  propagateDeletion(id: number) {
    this.entryDeleted.emit(id);
  } 
}
