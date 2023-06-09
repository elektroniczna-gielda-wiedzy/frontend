import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return ''

    const [date, time] = value.split(' ');
    const [day, month, year] = date.split(':');
    let [hour, minute] = time.split(':');

    let previous = new Date(+year, +month - 1, +day, +hour, +minute);
    let current = new Date();

    let elapsed = current.getTime() - previous.getTime();

    let msPerSecond: number = 1000;
    let msPerMinute: number = 60 * 1000;
    let msPerHour: number = msPerMinute * 60;
    let msPerDay: number = msPerHour * 24;
    let msPerYear: number = msPerDay * 365;


    if (elapsed < msPerMinute) {
      return Math.round(elapsed / msPerSecond) + ' seconds ago';   
    }

    else if (elapsed < msPerMinute * 2) {
      return '1 minute ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerHour * 2) {
      return '1 hour ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';   
    }

    else if (elapsed < msPerDay * 2) {
      return 'yesterday';   
    }

    else if (elapsed < msPerDay * 8) {
      return Math.round(elapsed / msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
      return previous.toLocaleString('Pl', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' });   
    }

    else {
      return previous.toLocaleString('pl', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'  }); 
    }
  }
}
