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
  categorySubscription?: Subscription;
  categoryGroups: {name: string, categories: Category[]}[] = [];

  control: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryHttpService
      .getCategories()
      .subscribe((response) => {
        const categories = response.result;
        this.categoryGroups = [
          {
            name: 'Areas',
            categories: categories.filter(category => category.type === 1)
          },
          {
            name: 'Faculties',
            categories: categories.filter(category => category.type === 0)
          },
          
        ];
      });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  selectCategory() {
    this.control.value;
    console.log(this.control.value);
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }

  translate(text: string) {
    return this.translateService.instant(text);
  }
}
