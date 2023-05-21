import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BurgersService } from 'src/app/services/burgers.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public _burgersService: BurgersService,
    private _snackBar: MatSnackBar
  ) {}
  total: any = [];
  subSum: any;
  ngOnInit() {
    this.userCheck();
    this.getBurgersLocal();
    this.totalCost();
    this.totalItems();
  }

  getBurgersLocal() {
    const objectsString: any = localStorage.getItem('burger');
    this.total = JSON.parse(objectsString);
  }

  userCheck() {
    let role = this.authService.getRole();
    const objectsString: any = localStorage.getItem('burger');
    this.total = JSON.parse(objectsString);

    if (role === 'customer' && this.total[0]) {
    } else {
      this.router.navigate(['']);
    }
  }

  totalCost() {
    this.subSum = this.total.map((obj: any) => obj.shownPrice * obj.quantity);
    return this.subSum.reduce((a: any, b: any) => a + b);
  }

  totalItems() {
    try {
      for (let i = 0; i < this.total.length; i++) {
        return this.total.length;
      }
    } catch (error) {
      return;
    }
  }

  continueShopping() {
    this.router.navigate(['']);
  }
}
