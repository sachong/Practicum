import { NgModule } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxCalendarModule } from 'devextreme-angular/ui/calendar';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxPopupModule } from 'devextreme-angular/ui/popup';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTagBoxModule } from 'devextreme-angular/ui/tag-box';
import { DxTextAreaModule } from 'devextreme-angular/ui/text-area';


@NgModule({
  declarations: [],
  imports: [
    DxCalendarModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxNumberBoxModule,
    DxFormModule,
    DxButtonModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxChartModule,
    DxPieChartModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxTagBoxModule
  ],
  exports: [
    DxCalendarModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxNumberBoxModule,
    DxFormModule,
    DxButtonModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxPopupModule,
    DxChartModule,
    DxPieChartModule,
    DxFileUploaderModule,
    DxHtmlEditorModule,
    DxTagBoxModule
  ]
})
export class DxModule {}
