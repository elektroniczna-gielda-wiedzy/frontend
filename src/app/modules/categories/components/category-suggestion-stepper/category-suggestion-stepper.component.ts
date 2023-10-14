import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Category, CategoryHttpService, CategoryService } from 'src/app/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-category-suggestion-stepper',
  templateUrl: './category-suggestion-stepper.component.html',
  styleUrls: ['./category-suggestion-stepper.component.scss'],
})
export class CategorySuggestionStepperComponent implements OnInit {
  firstFormGroup: FormGroup = this.fb.group({
    categoryTypeCtrl: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this.fb.group({
    operationCtrl: ['', Validators.required],
  });
  thirdFormGroup: FormGroup = this.fb.group({
    existingCategoryCtrl: ['', Validators.required],
  });

  categories: Category[] = [];
  selectedCategoryType: 'areas' | 'faculties' | null = null;
  polishName = '';
  englishName = '';

  constructor(
    private fb: FormBuilder,
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {}

  fetchCategories(): void {
    const params = {
      type: this.selectedCategoryType === 'areas' ? 1 : 0,
      parent_id: -1,
    };

    this.categoryHttpService.getCategories(params).subscribe((response) => {
      if (!response.success) {
        return;
      }
      this.categories = response.result;
    });
  }

  saveCategory(): void {
    const newCategory: Category = {
      type: this.selectedCategoryType === 'areas' ? 1 : 0,
      parent_id: this.thirdFormGroup.get('existingCategoryCtrl')?.value,
      names: [
        {
          lang_id: 1,
          name: this.polishName,
        },
        {
          lang_id: 2,
          name: this.englishName,
        },
      ],
      category_id: 0,
      status: 'SUGGESTED',
    };
    this.categoryHttpService
      .createCategory(newCategory)
      .subscribe((response) => {
        if (response.success && response.result.length > 0) {
          if (response.success) {
            this.displayNotification(
              this.translateService.instant('--suggestion-sent-msg')
            );
            this._location.back();
          }
        }
      });
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  onStepChange(event: any): void {
    if (event.previouslySelectedIndex === 0) {
      const newSelectedType =
        this.firstFormGroup.get('categoryTypeCtrl')?.value;
      if (this.selectedCategoryType !== newSelectedType) {
        this.thirdFormGroup.setValue({
          existingCategoryCtrl: '',
        });
        this.thirdFormGroup.updateValueAndValidity();
      }
      this.selectedCategoryType = newSelectedType;
    }
    if (
      event.selectedIndex === 2 &&
      this.secondFormGroup.get('operationCtrl')?.value === 'newSubcategory'
    ) {
      this.fetchCategories();
    }
  }

  displayNotification(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 7000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
    });
  }

  cancel(): void {
    this._location.back();
  }

  canSaveCategory(): boolean {
    return (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.polishName !== '' &&
      this.englishName !== ''
    );
  }
}
