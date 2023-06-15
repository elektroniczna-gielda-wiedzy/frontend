import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Answer,
  Category,
  CategoryService,
  Entry,
  EntryHttpService,
  EntryType,
  ImageService,
  Language,
  stringToEntryType,
} from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { FullscreenImageDialogComponent } from 'src/app/shared/components/fullscreen-image-dialog/fullscreen-image-dialog.component';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss'],
})
export class EntryDetailsComponent {
  entryType!: EntryType;
  entry?: Entry;
  image?: SafeUrl;
  private entrySubscription?: Subscription;
  private langChangeSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;

  constructor(
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private imageService: ImageService,
    private dialog: MatDialog
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
    if (!this.entryType) return;

    this.entrySubscription = this.entryHttpService
      .getEntry(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe((response) => {
        this.entry = response.result[0];
        if (this.entry.image) {
          this.loadImage(this.entry.image);
        }
      });
  }

  loadImage(imageUrl: string): void {
    this.imageService.getImage(imageUrl).then((response) => {
      this.image = response;
    });
  }

  handleFavorite(e: MouseEvent) {
    e.stopPropagation();
    if (!this.entry) return;
    this.entry.favorite = !this.entry?.favorite;
  }
  
  openDialog(): void {
    this.dialog.open(FullscreenImageDialogComponent, {
      data: { image: this.image },
      panelClass: 'fullscreen-dialog'
    });
  }
}
