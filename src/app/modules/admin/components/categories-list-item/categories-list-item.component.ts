import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Category, CategoryService } from 'src/app/core';

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './categories-list-item.component.html',
  styleUrls: ['./categories-list-item.component.scss'],
})
export class CategoriesListItemComponent {
  @Input() category!: Category;
  @Input() isSubcategory: boolean = false;

  @Output() onAddCategory: EventEmitter<Category> = new EventEmitter();
  @Output() onUpdateCategory: EventEmitter<Category> = new EventEmitter();
  @Output() onDeleteCategory: EventEmitter<number> = new EventEmitter<number>();
  polishName: string = '';
  englishName: string = '';
  isInputDisabled: boolean = true;
  state: 'Default' | 'Add subcategory' | 'Edit' = 'Default';

  constructor(private categoryService: CategoryService) {}

  inputEnable(
    newState: 'Default' | 'Add subcategory' | 'Edit' = 'Default'
  ): void {
    if (newState === 'Add subcategory') {
      this.polishName = '';
      this.englishName = '';
    }
    this.isInputDisabled = false;
    this.state = newState;
  }

  inputDisable(setNames: boolean = false): void {
    this.isInputDisabled = true;
    this.state = 'Default';
    if (setNames) {
      this.setNames();
    }
  }

  setNames(): void {
    this.polishName =
      this.category.names.find((name) => name.lang_id === 1)?.name || '';
    this.englishName =
      this.category.names.find((name) => name.lang_id === 2)?.name || '';
  }

  onFormSubmit(): void {
    if (this.polishName === '' || this.englishName === '') {
      return;
    }
    if (this.state === 'Add subcategory') {
      this.addCategory();
      this.inputDisable(true);
    } else if (this.state === 'Edit') {
      this.updateCategory();
      this.inputDisable();
    }
  }

  addCategory(): void {
    const newCategory: Category = {
      category_id: 0,
      parent_id: this.category.category_id,
      type: this.category.type,
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
    };
    this.onAddCategory.emit(newCategory);
  }

  updateCategory(): void {
    const updatedCategory: Category = {
      ...this.category,
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
    };
    this.onUpdateCategory.emit(updatedCategory);
  }

  deleteCategory(): void {
    this.onDeleteCategory.emit(this.category.category_id);
  }

  getCategoryName(category: Category) {
    return this.categoryService.getCategoryName(category);
  }
}
