import {
    Injectable,
    EventEmitter
  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // tslint:disable-next-line: variable-name
  private _sideBarWidth = 0;
  private _isSidebarToggled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  sidebarWidthChange = new EventEmitter < number > ();
  get sideBarWidth() {
    return this._sideBarWidth;
  }

  public getSideBarWidth(): Observable<boolean> {
    return this._isSidebarToggled$.asObservable();
  }

  set sideBarWidth(value: number) {
    this._sideBarWidth = value;
    this.sidebarWidthChange.emit(this._sideBarWidth);

  }

  // tslint:disable-next-line: variable-name
  private _sidebarState = 'shrunk';
  get sidebarState() {
    return this._sidebarState;
  }
  set sidebarState(value: string) {
    this._sidebarState = value;
  }

  // tslint:disable-next-line: variable-name
  private _isScreenTooSmall = true;
  get isScreenTooSmall() {
    return this._isScreenTooSmall;
  }
  set isScreenTooSmall(value: boolean) {
    this._isScreenTooSmall = value;
  }

  // tslint:disable-next-line: variable-name
  private _isSidebarToggled: boolean;
  get isSidebarToggled() {
    return this._isSidebarToggled;
  }
  set isSidebarToggled(value: boolean) {
    this._isSidebarToggled = value;
    this._isSidebarToggled$.next(value);
    this.sidebarState = (this.isSidebarToggled) ? 'expanded' : 'shrunk';
  }

  // tslint:disable-next-line: variable-name
  private _isSidebarUserHidden: boolean;
  get isSidebarUserHidden() {
    return this._isSidebarUserHidden;
  }
  set isSidebarUserHidden(value: boolean) {
    this._isSidebarUserHidden = value;
  }

  constructor() {
    this.isSidebarToggled = false;
    this.isSidebarUserHidden = false;
    this.isScreenTooSmall = true;
  }
}