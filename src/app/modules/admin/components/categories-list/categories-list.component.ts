import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryHttpService, CategoryService } from 'src/app/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  private categorySubscription?: Subscription;
  categoryGroups: { name: string; categories: Category[] }[] = [];
  childToParentMap: { [key: number]: number } = {};
  polishName: string = '';
  englishName: string = '';
  addCategoryFormState: string = 'closed';

  constructor(
    private categoryHttpService: CategoryHttpService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = this.categoryHttpService
      .getCategories()
      .subscribe((response) => {
        const { categoryGroups, childToParentMap } =
          this.categoryService.initCategories(response.result);
        this.categoryGroups = categoryGroups;
        this.childToParentMap = childToParentMap;
      });
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }

  trackByFn(index: any, item: any) {
    return item.category_id;
  }

  displayAddCategoryForm(name: string): void {
    this.polishName = '';
    this.englishName = '';
    this.addCategoryFormState = name;
  }

  getAddCategoryFormTitle(name: string): string {
    return name === 'Areas' ? 'Add new area' : 'Add new faculty';
  }

  setAddCategoryFormState(name: string) {
    this.addCategoryFormState = name;
  }

  cancelAddCategory(): void {
    this.polishName = '';
    this.englishName = '';
    this.addCategoryFormState = 'closed';
  }

  _addCategory(): void {
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
      type: 0,
      category_id: 0,
    };

    this.addCategory(newCategory);
  }

  addCategory(category: Category): void {
    this.categoryHttpService.createCategory(category).subscribe((response) => {
      this.categoryGroups = this.categoryGroups.map((group) => ({
        ...group,
        categories: group.categories.concat(response.result),
      }));
      this.cancelAddCategory();
    });
  }

  updateCategory(updatedCategory: Category): void {
    this.categoryHttpService
      .updateCategory(updatedCategory)
      .subscribe((response) => {
        this.categoryGroups = this.categoryGroups.map((group) => ({
          ...group,
          categories: group.categories.map((category) =>
            category.category_id === updatedCategory.category_id
              ? updatedCategory
              : category
          ),
        }));
      });
  }

  deleteCategory(categoryId: number): void {
    this.categoryHttpService
      .deleteCategory(categoryId)
      .subscribe((response) => {
        this.categoryGroups = this.categoryGroups.map((categoryGroup) => {
          return {
            ...categoryGroup,
            categories: categoryGroup.categories.filter(
              (category) => category.category_id !== categoryId
            ),
          };
        });
      });
  }
}
