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
} from 'src/app/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NGXLogger } from 'ngx-logger';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-entry-add',
  templateUrl: './entry-add.component.html',
  styleUrls: ['./entry-add.component.scss'],
})
export class EntryAddComponent implements OnInit, OnDestroy {
  entryType: EntryType | null  = null;
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
  private langChangeSubscription?: Subscription;
  private breakpointSubscription?: Subscription;
  currentLanguage: Language = this.languageService.language;
  imageError!: string;
  isImageSaved: boolean | null | undefined;
  cardImageBase64: string | null | undefined;
  cols = 2;

  selectedFile: File | undefined;
  constructor(
    private readonly route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location,
    private entryService: EntryHttpService,
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private logger: NGXLogger,
    private router: Router,
    private languageService: LanguageService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.languageService.languageChange.subscribe(
      () => {
        this.currentLanguage = this.languageService.language;
      }
    );


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

    this.breakpointSubscription = this.breakpointObserver.observe([
      '(max-width: 599px)',
    ]).subscribe(result => {
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
  }

  selectCategory() {
    this.form.value.categories;
  }

  onFileSelected(event: any): void {
    const max_size = 20971520;
    const allowed_types = ['image/png', 'image/jpeg'];
    const max_height = 15200;
    const max_width = 25600;
    this.selectedFile = event.target.files[0] ?? null;

    // if (event.target.files[0].size > max_size) {
    //   this.imageError =  'Maximum size allowed is ' + max_size / 1000 + 'Mb';
    //  }
    var fileReader = new FileReader();
    fileReader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;       
        const imgBase64Path = e.target.result;
        this.cardImageBase64 = imgBase64Path;
        this.cardImageBase64 = this.cardImageBase64?.substring(this.cardImageBase64.indexOf(',') + 1);
        
        this.isImageSaved = true;
    };
   
    fileReader.readAsDataURL(event.target.files[0]);
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
          image: this.cardImageBase64?.toString(),
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

  getEntryTypeHint(entry_type : EntryType | null){
    let result: string = ""; 
    if (entry_type) {
      result =  this.entryService.getCategoryTypeHint(entry_type);
    }
    return result;
  }
}
