import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';
import { convertToDate } from './convertToDate';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(value: any, lang: Language = Language.en): any {
    if (!value) return '';

    const previous = convertToDate(value);
    const elapsed = new Date().getTime() - previous.getTime();

    const msPerSecond: number = 1000;
    const msPerMinute: number = 60 * 1000;
    const msPerHour: number = msPerMinute * 60;
    const msPerDay: number = msPerHour * 24;
    const msPerYear: number = msPerDay * 365;

    switch (true) {
      case elapsed < msPerMinute * 2:
        return this.languageService.translate('now');

      case elapsed < msPerHour:
        return (
          Math.round(elapsed / msPerMinute) +
          ' ' +
          this.languageService.translate('minutes ago')
        );

      case elapsed < msPerHour * 2:
        return '1 ' + ' ' + this.languageService.translate('hour ago');

      case elapsed < msPerDay:
        return (
          Math.round(elapsed / msPerHour) +
          ' ' +
          this.languageService.translate('hours ago')
        );

      case elapsed < msPerDay * 2:
        return this.languageService.translate('yesterday');

      case elapsed < msPerDay * 8:
        return (
          Math.round(elapsed / msPerDay) +
          ' ' +
          this.languageService.translate('days ago')
        );

      case elapsed < msPerYear:
        return previous.toLocaleString(Language[lang], {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        });

      default:
        return previous.toLocaleString(Language[lang], {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
    }
  }
}
