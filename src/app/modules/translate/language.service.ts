import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Language, stringToLanguage } from 'src/app/core';

import en from 'src/translations/en.json';
import pl from 'src/translations/pl.json';
const LANGUAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private langChangeSubscription?: Subscription;

  constructor(private translateService: TranslateService) {
    this.translateService.setTranslation('en', en);
    this.translateService.setTranslation('pl', pl);
  }

  get language(): number {
    return stringToLanguage(this.translateService.currentLang);
  }

  get languageString(): string {
    return this.translateService.currentLang;
  }

  get languageChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  set language(lang: Language) {
    this.translateService.use(Language[lang]);
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  init(defaultLanguage: string): void {
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(
      localStorage.getItem(LANGUAGE_KEY) || defaultLanguage
    );

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem(LANGUAGE_KEY, event.lang);
      }
    );
  }

  destroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
