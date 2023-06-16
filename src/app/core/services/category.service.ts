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

  
}
