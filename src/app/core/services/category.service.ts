import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private languageService: LanguageService) {}

  getCategoryName(category: Category) {
    return category.names.find(
      (name) => name.lang_id === this.languageService.language
    )?.name;
  }

  getCategoryClass(category: Category): string[] {
    const result: string[] = ['category'];

    if (category.parent_id !== null) {
      category.type === 1 ? result.push('subarea') : result.push('major');
    }
    category.type === 1 ? result.push('area') : result.push('faculty');
    return result;
  }

  initCategoriesNested(categories: Category[]) {
    const categoriesDictionary: { [key: number]: Category } = {};
    const categoriesParentMap: { [key: number]: number[] } = {};
    let parentCategoriesIds: number[] = [];

    categories.forEach((category) => {
      categoriesDictionary[category.category_id] = category;
      if (category.parent_id) {
        if (!categoriesParentMap[category.parent_id]) {
          categoriesParentMap[category.parent_id] = [];
        }
        categoriesParentMap[category.parent_id].push(category.category_id);
      } else if (categoriesParentMap[category.category_id] === undefined) {
        categoriesParentMap[category.category_id] = [];
      }
    });
    parentCategoriesIds = Object.keys(categoriesParentMap).map((id) =>
      parseInt(id)
    );

    return { categoriesDictionary, categoriesParentMap, parentCategoriesIds };
  }

  initCategories(categories: Category[]) {
    const childToParentMap: { [key: number]: number } = {};
    const categoryGroups: {
      name: string;
      type: number;
      categories: Category[];
    }[] = [
      {
        name: 'Faculties',
        type: 0,
        categories: categories.filter((category) => category.type === 0),
      },
      {
        name: 'Areas',
        type: 1,
        categories: categories.filter((category) => category.type === 1),
      },
    ];

    categories.forEach((category) => {
      if (category.parent_id) {
        childToParentMap[category.category_id] = category.parent_id;
      }
    });

    return { categoryGroups, childToParentMap };
  }
}
