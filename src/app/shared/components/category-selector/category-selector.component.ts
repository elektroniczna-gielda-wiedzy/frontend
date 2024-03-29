import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Category, CategoryHttpService, CategoryService } from 'src/app/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent implements OnInit, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = 'categories';
  @Input() parentAutoAdd: boolean = false;
  private categorySubscription?: Subscription;
  private controlSubscription?: Subscription;
  categoryGroups: { name: string; type: number, categories: Category[] }[] = [];
  selectedValues: number[] = [];
  childToParentMap: { [key: number]: number } = {};

  constructor(
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryHttpService
      .getCategories()
      .subscribe((response) => {
        const { categoryGroups, childToParentMap } = this.categoryService.initCategories(response.result);
        this.categoryGroups = categoryGroups;
        this.childToParentMap = childToParentMap;
        if (this.parentAutoAdd) {
          this.initControl();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.controlSubscription) {
      this.controlSubscription.unsubscribe();
    }
  }

  initControl() {
    this.controlSubscription = this.formGroup.controls[
      'categories'
    ].valueChanges.subscribe((value) => {
      if (!value || value === this.selectedValues) return;
    
      const newValue = value.filter(
        (val: number) => !this.selectedValues.includes(val)
      )[0];

      const removedValue = this.selectedValues.filter(
        (val: number) => !value.includes(val)
      )[0];

      this.selectedValues = value;
    
      if (newValue) {
        const parentId = this.childToParentMap[newValue];
        if (parentId && !this.selectedValues.includes(parentId)) {
          this.selectedValues.push(parentId);
          this.formGroup.controls['categories'].setValue(this.selectedValues, { emitEvent: false });
        }
        return;
      }   
      
      const parentId = this.childToParentMap[removedValue];
      if (parentId && this.selectedValues.includes(parentId)) {
        const noSiblingsSelected = this.selectedValues.reduce((acc: number, val: number) => {
          return this.childToParentMap[val] === parentId ? acc + 1 : acc;
        }, 0);

        if (noSiblingsSelected == 0) {
          this.selectedValues = this.selectedValues.filter((val: number) => val !== parentId);
          this.formGroup.controls['categories'].setValue(this.selectedValues, { emitEvent: false });
          return;
        }
        return;
      }
    
      if (!parentId) {
        Object.entries(this.childToParentMap).forEach(([child, parent]) => {
          if (parent === removedValue) {
            this.selectedValues = this.selectedValues.filter((val: number) => val !== parseInt(child));
          }
        });

        this.formGroup.controls['categories'].setValue(this.selectedValues, { emitEvent: false });
      }
    });
    
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  translate(text: string) {
    return this.translateService.instant(text);
  }

  trackByFn(index: any, item: any) {
    return item.category_id;
  }
}
