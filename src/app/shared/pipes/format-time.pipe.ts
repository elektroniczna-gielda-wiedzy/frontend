import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/app/core';
import { convertToDate } from './convertToDate';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: any, lang: Language = Language.en): any {
    if (!value) return '';
    const dateObject = convertToDate(value);
    return dateObject.toLocaleString(Language[lang], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }
}
