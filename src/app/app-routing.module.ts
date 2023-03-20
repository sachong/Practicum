import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/modules/auth/auth-guard.service';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { ContentModule } from 'src/app/modules/content/content.module';
import { LayoutComponent } from 'src/app/modules/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    loadChildren: () => ContentModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }