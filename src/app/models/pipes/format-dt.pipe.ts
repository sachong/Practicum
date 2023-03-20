import { Pipe, PipeTransform } from '@angular/core';
import { CommonFunctionsService } from '@services/common-functions.service';

@Pipe({
    name: 'formatDT'
})
export class FormatDTPipe implements PipeTransform {
    constructor(private cFService: CommonFunctionsService) {}

    transform(dString: string): any {
        const dt = this.cFService.DateFromString(dString);
        const s = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
        return s;    
    }
}
