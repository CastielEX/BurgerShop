import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthGuard } from 'src/app/shared/authguard.guard';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(public authguard: AuthGuard, public authservice: AuthService) {}
  userRole: any;
  items: number = 0;

  tokenStatus = false;
  tokenID = !!localStorage.getItem('token');
  token() {
    if (this.tokenID) {
      this.authguard.canActivate;
      this.tokenStatus = false;
    }
    {
      this.tokenStatus = true;
    }
  }
  ngDoCheck() {
    this.userRole = localStorage.getItem('role');
    const local: any = localStorage.getItem('burger');
    if (local !== null) {
      const length = JSON.parse(local).length;
      this.items = length;
    } else {
      this.items = 0;
    }
  }

  logOut() {
    localStorage.clear();
  }
}
