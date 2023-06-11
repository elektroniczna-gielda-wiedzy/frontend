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
} from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.scss'],
})
export class EntryAddComponent implements OnInit, OnDestroy {
  entryType: EntryType | null = null;
  entryTypeString: string | null = null;
  hide = true;
  sending = false;
  categories: Category[] = [];
  categorySubscription?: Subscription;
  form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
    categories: [null, [Validators.required]],
  });

  selectedFile: File | undefined;
  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location,
    private entryService: EntryHttpService,
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private logger: NGXLogger,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe((paramMap) => {
      const entryType = paramMap.get('entryType');
      if (entryType) {
        this.entryType = stringToEntryType(entryType);
        this.entryTypeString = entryType;
      }
    });

    this.categorySubscription = this.categoryHttpService
      .getCategories()
      .subscribe((category) => {
        this.categories = category.result;
        this.logger.info(this.categories);
      });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  selectCategory() {
    this.form.value.categories;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  backClicked() {
    this._location.back();
  }

  createNewEntry() {
    if (this.entryType) {
      this.sending = true;
      this.entryService
        .createEntry({
          entry_type_id: this.entryType,
          ...this.form.value,
          image: this.selectedFile?.toString(),
        })
        .subscribe((response) => {
          this.logger.info(response);
          this.sending = false;
          if (response.success && response.result.length > 0) {
            this.router.navigate([
              '/entries',
              this.entryTypeString,
              response.result[0].entry_id,
            ]);
          }
        });
    }
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }
}
