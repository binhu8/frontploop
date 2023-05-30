import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) { };

  theme = new BehaviorSubject<string>('light');
  $getTheme = this.theme.asObservable();

  darkMode(selected: boolean): void{

    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement
    let body = this.document.querySelector('html') as HTMLElement

    if(selected){
      themeLink.href = 'dark' + ".css"
      localStorage.setItem('theme', 'dark')
      body.classList.add('dark');
    }else{
      themeLink.href = 'light' + ".css"
      localStorage.setItem('theme', 'light')
      body.classList.add('light');
    }
  }

}
