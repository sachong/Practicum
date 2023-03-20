import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsService } from '@services/common-functions.service';

@Pipe({
    name: 'isSameDate'
})
export class IsSameDatePipe implements PipeTransform {
    constructor(private cFService: CommonFunctionsService) {}

    formatDT(dString: string) {
        const dt = this.cFService.DateFromString(dString);
        const s = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        return s;
      }

    transform(dString: string,  dComparisonString: string): any {
        if (dString == dComparisonString) {
            return true;
          }
          return false;        
    }
}
