import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsService } from '@services/common-functions.service';

@Pipe({
    name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {
    constructor(private cFService: CommonFunctionsService) {}

    formatDT(dString: string) {
        const dt = this.cFService.DateFromString(dString);
        const s = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        return s;
      }

    transform(dString: string): any {
        const dt = this.formatDT(dString);
        const todayString = this.cFService.DateAsString(new Date());
        let bResult = false;
        if (dt === todayString) {
          bResult = true;
        }
        return bResult;
    }
}
