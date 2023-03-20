import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor() { }

  DateFromString(timeString: string): Date {
    // console.log('DateFromString Called...', timeString);
    if (!timeString) {
      return new Date();
    }
    const a = timeString.split(/[^0-9]/);
    // for (i=0;i<a.length;i++) { alert(a[i]); }
    let d: Date;

    if (a.length === 6) {
      d = new Date(+a[0], +a[1] - 1, +a[2], +a[3], +a[4], +a[5]); // '2012-01-26T13:51:50.417-07:00') strip the timezone info.
    } else if (a.length >= 3 && +a[0] <= 12 && +a[1] <= 31 && +a[2] >= 1970 && +a[2] < 3000) {
      d = new Date(+a[2], +a[0] - 1, +a[1]); // put MM/dd/YYYY into this format: yyyy, MM, dd
    } else if (a.length >= 3 && +a[0] <= 12 && +a[1] <= 31 && +a[2] >= 0 && +a[2] < 99) {
      d = new Date(2000 + (+a[0]), +a[1] - 1, +a[2]);
    } else {
      d = new Date();
    }
    return d;
  }

  DateAsString(dt: Date) {
    const s = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
    return s;
  }

  DateDiff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
}
