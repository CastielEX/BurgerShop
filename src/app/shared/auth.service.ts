import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  roleAs: any;
  IsloggedIn() {
    // const loggedIn = localStorage.getItem('token');
    return !!localStorage.getItem('token');
  }

  // login(value: string) {
  //   this.isLogin = true;
  //   this.roleAs = value;
  //   localStorage.setItem('STATE', 'true');
  //   localStorage.setItem('ROLE', this.roleAs);
  //   return of({ success: this.isLogin, role: this.roleAs });
  // }

  // logout() {
  //   this.isLogin = false;
  //   this.roleAs = '';
  //   localStorage.setItem('STATE', 'false');
  //   localStorage.setItem('ROLE', '');
  //   return of({ success: this.isLogin, role: '' });
  // }

  constructor() {}

  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }
}
