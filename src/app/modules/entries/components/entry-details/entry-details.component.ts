import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Answer,
  Category,
  CategoryService,
  Entry,
  EntryAnswer,
  EntryHttpService,
  EntryType,
  Language,
  stringToEntryType,
} from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent {
  entryType!: EntryType;
  entry!: EntryAnswer ;
  private entrySubscription?: Subscription;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  //answers!: Answer;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private categoryService: CategoryService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );

    this.entryType = stringToEntryType(
      this.route.snapshot.paramMap.get('entryType')!
    );
    this.loadEntry();
    
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
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
        .getEntryAnswers(Number(this.route.snapshot.paramMap.get('id')))
        .subscribe((response) => {
          
          this.entry = response.result[0]

          console.log( response)
          //this.getAnswers(this.entry)
        });
    }
  }

  handleFavorite(e: MouseEvent) {
    e.stopPropagation();
    if (!this.entry) return;
    this.entry.favorite = !this.entry?.favorite;
  }

  // getAnswers(entry: Entry | undefined){
  //   if (entry){
  //     this.answers = this.entryHttpService.getAnswers(entry);
  //   }
  // }
}
