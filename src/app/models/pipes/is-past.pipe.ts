import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsService } from '@services/common-functions.service';

@Pipe({
    name: 'isPast'
})
export class IsPastPipe implements PipeTransform {
    constructor(private cFService: CommonFunctionsService) {}

    formatDT(dString: string) {
        const dt = this.cFService.DateFromString(dString);
        const s = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        return s;
      }

    transform(dString: string): any {
        const dtStringShort = this.formatDT(dString);
        const todayString = this.cFService.DateAsString(new Date());
        const dt = this.cFService.DateFromString(dtStringShort);
        const dtToday = this.cFService.DateFromString(todayString);
        // console.log('isInFuture parms: ', dt, todayString);
        const diff = this.cFService.DateDiff(dt, dtToday);
        const bResult = (diff >= 0) ? true : false;
        // console.log('isInFuture result: ', diff, bResult);
        return bResult;
    }
}
