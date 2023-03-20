import { Injectable } from '@angular/core';
import DxThemes from 'devextreme/ui/themes';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    const setter = JSON.parse(localStorage.getItem("isDarkMode"));
    if (setter) {
      this.isDarkMode$.next(setter);
      DxThemes.current(DxThemes.current() === 'generic.light' ? 'generic.dark' : 'generic.light');
    }
  }

  setDarkMode(setter: boolean) {
    this.isDarkMode$.next(setter);
    window.localStorage.setItem("isDarkMode", "" + setter);
  }

  getDarkMode(): Observable<boolean> {
    return this.isDarkMode$.asObservable();
  }
}
