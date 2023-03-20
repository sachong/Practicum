import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserRoles } from 'src/app/models/user-roles';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { OdataContextService } from 'src/app/services/odata-context.service';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import notify from 'devextreme/ui/notify';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [NgbModal],
})
export class AdvancedTimeComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;


  toast = false; 
  toastError = false; 


  UserRoles = UserRoles;

  isDarkMode: boolean;

  unsubscribe = new Subject();

  constructor(
    private odataService: OdataContextService,
    public authService: AuthService,
    private darkModeService: DarkModeService,

  ) {
    
  }

  ngOnInit() {
    this.darkModeService
      .getDarkMode()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result) => {
        this.isDarkMode = result;
      });
    this.editorOptions = { 
        step: 0,  
     };  
  }


  hasRoleAccess(userRoles: UserRoles[]): boolean {
    return false
  }


  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}
