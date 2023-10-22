export function convertToDate(value: string): Date {
    value = value.split('+')[0];
    const [date, time] = value.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const current = new Date();
    const previous = new Date(+year, +month - 1, +day, +hour, +minute - current.getTimezoneOffset());
    return previous;
}