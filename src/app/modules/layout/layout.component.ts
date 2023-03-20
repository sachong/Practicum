import {
  Component,
  OnInit
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { LayoutService } from 'src/app/services/layout.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ResizeHostListenerService } from 'src/app/services/host/resize-host-listener.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-layout',
  animations: [
    trigger('sidebarAnimate', [
      state('shrunk', style({
        width: '{{currentSidebarWidth}}'
      }), { params: { currentSidebarWidth: '60px' } }),
      state('expanded', style({
        width: '{{currentSidebarWidth}}',
      }), { params: { currentSidebarWidth: 'max-content' } }),
      transition(':enter', [
        style({ transform: 'translateX(0px)' }),
        animate('0.1s linear')
      ]),
      transition('shrunk => expanded', [
        style({ transform: 'translateX(0px)' }),
        animate('0.1s linear')
      ]),
      transition('expanded => shrunk', [
        style({ transform: 'translateX(0px)' }),
        animate('0.1s linear')
      ]),
    ])
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent{
  onDestroy$: Subject<void> = new Subject<void>();
  constructor(public layoutService: LayoutService, public resizeHostListenerService: ResizeHostListenerService) {
  }

  ngOnDestroy() {
      this.onDestroy$.next();
      this.onDestroy$.complete();
  }
}