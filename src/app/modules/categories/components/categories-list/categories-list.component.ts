import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Category, CategoryHttpService, CategoryService, CategoryType } from 'src/app/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  private categorySubscription?: Subscription;
  polishName: string = '';
  englishName: string = '';
  addCategoryFormState: CategoryType | null = null;

  private refreshCategoriesSubject = new BehaviorSubject<boolean>(false);
  refreshCategories$: Observable<boolean> =
    this.refreshCategoriesSubject.asObservable();

  categoriesDictionary: { [key: number]: Category } = {};
  categoriesParentMap: { [key: number]: number[] } = {};
  parentCategoriesIds: number[] = [];
  tab: number = 0;
  loading = true;

  categoryTypes = [
    { id: CategoryType.AREA, label: 'Areas' },
    { id: CategoryType.FACULTY, label: 'Faculties' },
  ]

  constructor(
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  displayAddCategoryForm(categoryType: CategoryType): void {
    this.polishName = '';
    this.englishName = '';
    this.addCategoryFormState = categoryType;
  }

  getAddCategoryFormTitle(categoryType: CategoryType): string {
    return 'Add new ' + CategoryType[categoryType].toLowerCase(); 
  }

  setAddCategoryFormState(categoryType: CategoryType) {
    this.addCategoryFormState = categoryType;
  }

  cancelAddCategory(): void {
    this.polishName = '';
    this.englishName = '';
    this.addCategoryFormState = null;
  }

  _addCategory(type: number): void {
    const newCategory: Category = {
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
      parent_id: null,
      type: type,
      category_id: 0,
      status: this.tab
    };

    this.addCategory(newCategory);
  }

  addCategory(category: Category): void {
    this.categoryHttpService.createCategory(category).subscribe((response) => {
      if (response.success && response.result.length > 0) {
        const addedCategory = response.result[0];
        this.categoriesDictionary[addedCategory.category_id] = addedCategory;
        if (addedCategory.parent_id) {
          if (!this.categoriesParentMap[addedCategory.parent_id]) {
            this.categoriesParentMap[addedCategory.parent_id] = [];
          }
          this.categoriesParentMap[addedCategory.parent_id].push(
            addedCategory.category_id
          );
        } else {
          this.parentCategoriesIds.push(addedCategory.category_id);
          this.categoriesParentMap[addedCategory.category_id] = [];
        }
        this.cancelAddCategory();
      }
    });
  }

  updateCategory(updatedCategory: Category): void {
    this.categoryHttpService
      .updateCategory(updatedCategory)
      .subscribe((response) => {
        if (response.success && response.result.length > 0) {
          const category = response.result[0];
          this.categoriesDictionary[category.category_id] = category;
        }
      });
  }

  deleteCategory(categoryId: number): void {
    this.categoryHttpService
      .deleteCategory(categoryId)
      .subscribe((response) => {
        if (response.success) {
          const parentId = this.categoriesDictionary[categoryId].parent_id;
          if (parentId) {
            this.categoriesParentMap[parentId] = this.categoriesParentMap[
              parentId
            ].filter((id) => id !== categoryId);
          } else {
            this.parentCategoriesIds = this.parentCategoriesIds.filter(
              (id) => id !== categoryId
            );
            delete this.categoriesParentMap[categoryId];
          }

          delete this.categoriesDictionary[categoryId];
        }
      });
  }

  getLabel(label: string): string {
    switch (label) {
      case 'Active':
        return this.translateService.instant('Active');
      case 'Suggestions':
        return this.translateService.instant('Suggestions');
      default:
        return 'Active';
    }
  }

  onTabChange(event: any): void {
    this.tab = event.index;
    this.fetchCategories({ status: this.tab });
  }

  fetchCategories(params = {}): void {
    this.loading = true;
    this.categoryHttpService.getCategories(params).subscribe((response) => {
      this.loading = false;
      if (!response.success) {
        return;
      }

      const { categoriesDictionary, categoriesParentMap, parentCategoriesIds } =
        this.categoryService.initCategoriesNested(response.result);

      this.categoriesDictionary = categoriesDictionary;
      this.categoriesParentMap = categoriesParentMap;
      this.parentCategoriesIds = parentCategoriesIds;

      this.refreshCategoriesSubject.next(true);
      this.refreshCategoriesSubject.next(false);
    });
  }

  isFaculty(categoryType: CategoryType): boolean {
    return categoryType === CategoryType.FACULTY;
  }

  isArea(categoryType: CategoryType): boolean {
    return categoryType === CategoryType.AREA;
  }
}
