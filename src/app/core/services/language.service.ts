import { Injectable } from '@angular/core';
import { Language } from '../enums/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  get language(): number {
    return Language.English;
  }
}
