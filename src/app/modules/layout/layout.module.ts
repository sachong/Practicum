import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxModule } from 'src/app/modules/dx.module';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HasRoleAccess } from '@models/pipes/has-role-access-pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        DxModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule
    ],
    providers: [
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent,
        HasRoleAccess
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        FooterComponent,
        RouterModule
    ]
})

export class LayoutModule { }
