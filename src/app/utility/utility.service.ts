import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { navbarOpenSignal } from './navbar.signals';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor( private route: Router ) { }

  
  navigate(path: string, params?: string) {
    navbarOpenSignal.set(false);
    this.route.navigateByUrl(path);
  }
}
