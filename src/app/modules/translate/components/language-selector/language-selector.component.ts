import { Component, Input } from '@angular/core';
import { LanguageService } from '../../language.service';
import { Language } from 'src/app/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() sideNav: boolean = false;

  constructor(private languageService: LanguageService) { }

  get currentLanguage(): Language {
    return this.languageService.language;
  }

  setLanguage(lang: number) {
    this.languageService.language = lang;
  }

  get polish(): Language {
    return Language.pl
  }

  get english(): Language {
    return Language.en
  }

  get polishSelector(): string {
    return Language[Language.pl].toUpperCase();
  }

  get englishSelector(): string {
    return Language[Language.en].toUpperCase();
  }

}
