import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private cookieStore = {};

  constructor() {
    this.parseCookies(document.cookie);
  }

  public parseCookies(cookies = document.cookie): void {
    this.cookieStore = {};
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string): void {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  remove(key: string): void {
    document.cookie = `${key} = ; expires=Thu, 1 jan 2029 12:00:00 UTC; path=/`;
  }

  set(key: string, value: string): void {
    document.cookie = key + '=' + (value || '');
  }
}
