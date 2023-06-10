import { Component } from '@angular/core';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  constructor(private languageService: LanguageService) { }

  get language(): number {
    return this.languageService.language;
  }

  setLanguage(lang: number) {
    this.languageService.language = lang;
  }
}
