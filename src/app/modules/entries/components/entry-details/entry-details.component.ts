import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
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
  TokenService,
  stringToEntryType,
} from 'src/app/core';
import { ChatService } from 'src/app/modules/chat/services/chat.service';
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
    private router: Router,
    private readonly route: ActivatedRoute,
    private entryHttpService: EntryHttpService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private imageService: ImageService,
    private dialog: MatDialog,
    private logger: NGXLogger,
    private chatService: ChatService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(idParam)) {
      this.router.navigate(['/']);
      return;
    }

    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );

    this.entryType = stringToEntryType(
      this.route.snapshot.paramMap.get('entryType')!
    );
    this.loadEntry(idParam);
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

  loadEntry(id: number): void {
    if (!this.entryType) return;

    this.entrySubscription = this.entryHttpService.getEntry(id).subscribe({
      next: (response) => {
        this.entry = response.result[0];
        if (this.entry.entry_type_id !== this.entryType) {
          this.router.navigate([
            'entries',
            EntryType[this.entry.entry_type_id].toLowerCase(),
            this.entry.entry_id,
          ]);
          this.entryType = this.entry.entry_type_id;
          return;
        }

        if (this.entry.image) {
          this.loadImage(this.entry.image);
        }
      },
      error: (response) => {
        console.error(response);
        this.router.navigate(['/']);
      },
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
      panelClass: 'fullscreen-dialog',
    });
  }
 
  entryDeleted(id: number) {
    if (this.entry && this.entry.entry_id === id) {
      this.router.navigate(['/']);
    }
  }

  contactAuthor() {
    if (!this.entry) return;
    this.chatService.startChatWithUser(this.entry.author);
    this.router.navigate(['/chat']);
  }

  get isAuthor(): boolean {
    if (!this.entry) return false;
    return this.tokenService.getUserId() === this.entry.author.user_id;
  }
}
