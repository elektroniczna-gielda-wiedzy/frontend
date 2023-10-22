import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import {
  EntryType,
  stringToEntryType,
  EntryHttpService,
  Category,
  CategoryHttpService,
  CategoryService,
  Language,
  EntryRequest,
  ImageService,
  StandardResponse,
  Entry,
} from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FullscreenImageDialogComponent } from 'src/app/shared/components/fullscreen-image-dialog/fullscreen-image-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.scss'],
})
export class EntryAddComponent implements OnInit, OnDestroy {
  entry?: Entry;
  entryId?: number;
  entryImage?: string | null;
  defaultImage?: string;
  entryType!: EntryType;
  entryTypeString: string | null = null;
  sending = false;
  categories: Category[] = [];
  categorySubscription?: Subscription;
  form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    categories: [null, [Validators.required]],
    image: [null],
  });
  private langChangeSubscription?: Subscription;
  private breakpointSubscription?: Subscription;
  private entrySubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  imageError: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string | null | undefined;
  filename = '';
  cols = 2;
  imageRowSpan = 1;
  suggestionWizardOpen = false;

  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location,
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private logger: NGXLogger,
    private router: Router,
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
    private entryHttpService: EntryHttpService,
    private imageService: ImageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );
    const entryType = this.route.snapshot.paramMap.get('entryType');
    if (entryType) {
      this.entryType = stringToEntryType(entryType);
      this.entryTypeString = entryType;
    }

    if (this.route.snapshot.url.at(-1)?.path === 'edit') {
      const entryId = Number(this.route.snapshot.paramMap.get('id'));
      if (isNaN(entryId)) {
        this.router.navigate(['entries', this.entryTypeString, 'add']);
      } else {
        this.entryId = entryId;
        this.loadEntry(entryId);
      }
    }

    this.categorySubscription = this.categoryHttpService
      .getCategories()
      .subscribe((category) => {
        this.categories = category.result;
        this.logger.info(this.categories);
      });

    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.cols = result.matches ? 1 : 2;
      });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
    if (this.entrySubscription) {
      this.entrySubscription.unsubscribe();
    }
  }

  loadEntry(id: number): void {
    this.entrySubscription = this.entryHttpService.getEntry(id).subscribe({
      next: (response) => {
        if (!(response.success && response.result?.length > 0)) {
          this.router.navigate(['entries', this.entryTypeString, 'add']);
          return;
        }

        this.entry = response.result[0];

        if (this.entry.entry_type_id !== this.entryType) {
          this.router.navigate([
            'entries',
            EntryType[this.entry.entry_type_id].toLowerCase(),
            this.entry.entry_id,
            'edit',
          ]);
          this.entryType = this.entry.entry_type_id;
          this.entryTypeString =
            EntryType[this.entry.entry_type_id].toLowerCase();
        }

        this.form.patchValue({
          title: this.entry.title,
          content: this.entry.content,
          categories: this.entry.categories.map(
            (category) => category.category_id
          ),
        });
        if (this.entry.image) {
          this.loadImage(this.entry.image);
        }
      },
      error: (response) => {
        this.router.navigate(['entries', this.entryTypeString, 'add']);
      },
    });
  }

  loadImage(image: string): void {
    this.imageService.getImage(image).then((response) => {
      this.imageRowSpan = 3;
      this.entryImage = response;
      this.defaultImage = response;
    });
  }

  onFileSelected(event: any): void {
    this.imageService.readImageFile(event).then(({filename, imgBase64}) => {
      this.filename = filename;
      this.entryImage = imgBase64
      this.cardImageBase64 = imgBase64?.substring(
        imgBase64.indexOf(',') + 1
      );
      this.imageRowSpan = 3;
      this.isImageSaved = true;
      this.imageError = '';
    }).catch((err) => {
      this.logger.error(err);
      this.imageError = err;
    });
  }

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const entry: EntryRequest = {
      entry_type_id: this.entryType,
      ...this.form.value,
    };

    if (this.filename && this.cardImageBase64) {
      entry.image = {
        filename: this.filename,
        data: this.cardImageBase64,
      };
    
    }
    this.sending = true;

    const handleResponse = {
      next: (res: StandardResponse<Entry>) => {
        this.logger.info(res);
        this.sending = false;
        if (res.success && res.result.length > 0) {
          this.router.navigate([
            '/entries',
            this.entryTypeString,
            res.result[0].entry_id,
          ]);
        }
      },
      error: (err: any) => {
        this.sending = false;
        this.logger.error(err);
      },
    };

    if (this.entryId) {
      this.entryHttpService
        .updateEntry(this.entryId, entry)
        .subscribe(handleResponse);
    } else {
      this.entryHttpService.createEntry(entry).subscribe(handleResponse);
    }
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  getHint(entryType: EntryType | null) {
    if (!entryType) {
      return '';
    }
    return this.languageService.translate(EntryType[entryType] + '.hint');
  }

  removeImage() {
    this.entryImage = this.defaultImage ?? null;
    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.filename = '';
    this.imageRowSpan = this.defaultImage ? 3 : 1;
    this.imageError = '';
    this.form.controls['image'].setValue(null);
  }

  openDialog(): void {
    this.dialog.open(FullscreenImageDialogComponent, {
      data: { image: this.entryImage },
      panelClass: 'fullscreen-dialog',
    });
  }

  openSuggestionWizard(): void {
    this.router.navigate(['categories', 'suggest']);
  }

  get displayImageSelector(): boolean {
    return this.entryType !== EntryType.Announcement;
  }
}
