import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/app/core';
import { LanguageService } from 'src/app/modules/translate/language.service';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  constructor(private languageService: LanguageService) { }

  transform(value: any, lang: Language = Language.en): any {
    if (!value) return ''
    
    // const [date, time] = value.split(' ');
    // const [day, month, year] = date.split(':');
    // const [hour, minute] = time.split(':');
    const [date, time] = value.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const previous = new Date(+year, +month - 1, +day, +hour, +minute);
    const current = new Date();
    const elapsed = current.getTime() - previous.getTime();

    const msPerSecond: number = 1000;
    const msPerMinute: number = 60 * 1000;
    const msPerHour: number = msPerMinute * 60;
    const msPerDay: number = msPerHour * 24;
    const msPerYear: number = msPerDay * 365;


    if (elapsed < msPerMinute * 2) {
      return this.languageService.translate('now');
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " " + this.languageService.translate('minutes ago');   
    }

    else if (elapsed < msPerHour * 2) {
      return '1 ' + " " + this.languageService.translate('hour ago');
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " " + this.languageService.translate('hours ago');   
    }

    else if (elapsed < msPerDay * 2) {
      return this.languageService.translate('yesterday');   
    }

    else if (elapsed < msPerDay * 8) {
      return Math.round(elapsed / msPerDay) + " " + this.languageService.translate('days ago');   
    }

    else if (elapsed < msPerYear) {
      return previous.toLocaleString(Language[lang], { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' });   
    }

    else {
      return previous.toLocaleString(Language[lang], { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'  }); 
    }
  }
}
