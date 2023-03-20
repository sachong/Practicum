import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DxModule } from '../dx.module';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { TimebydayComponent } from './pages/timebyday/timebyday.component';
import { CompanyComponent } from './pages/company/company.component';
import { FormsModule } from '@angular/forms';
import { IsPastPipe } from 'src/app/models/pipes/is-past.pipe';
import { IsTodayPipe } from 'src/app/models/pipes/is-today.pipe';
import { IsSameDatePipe } from 'src/app/models/pipes/is-same-date.pipe';
import { FormatDTPipe } from 'src/app/models/pipes/format-dt.pipe';
import { FormatDTShortPipe } from 'src/app/models/pipes/format-dt-short.pipe';
import { MapComponent } from './pages/map/map.component';
import { UserRoles } from 'src/app/models/user-roles';
import { CanDeactivateGuard } from '@services/can-deactivate-guard.service';
import { RoleGuardService } from '@services/role-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', redirectTo: 'map', pathMatch: 'full'
      },
      {
        path: 'map', component: MapComponent, canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];


@NgModule({
  declarations: [
    MapComponent
   
  ],
  imports: [
    CommonModule,
    DxModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ 
    CanDeactivateGuard
  ]
})
export class ContentModule { }
