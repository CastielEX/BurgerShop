import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Burger } from 'src/app/interfaces/burger';
import { Observable } from 'rxjs/internal/Observable';
import { BurgersService } from 'src/app/services/burgers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  burgers: any = [];
  total: any = [];
  subSum: any;
  objectsString: any;
  local: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    public _burgersService: BurgersService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    let role = this.authService.getRole();
    if (role === 'customer') {
    } else {
      this.router.navigate(['']);
    }
    if (localStorage.getItem('burger') == null) {
      this.localFix();
    }
    {
    }
    this.getBurgersLocal();
    this.totalCost();
    this.totalItems();
    console.log(this.total);
  }

  getBurgersLocal() {
    let order = 1;
    try {
      // this.total = ['empty']
      // localStorage.setItem('burger', JSON.stringify(this.total));
      // this.total = []
      // localStorage.setItem('burger', JSON.stringify(this.total));
      this.objectsString = localStorage.getItem('burger');
      this.total = JSON.parse(this.objectsString);
      localStorage.setItem('burger', JSON.stringify(this.total));
      this.total.forEach((item: any) => {
        item.order = order++;
      });
      localStorage.setItem('burger', JSON.stringify(this.total));
    } catch (error) {
      return;
    }
  }

  removeItem(idClick: number) {
    for (let i: any = 0; i < this.total.length; i++) {
      if (this.total[i].id === idClick) {
        this.total.splice(i, 1);
        localStorage.setItem('burger', JSON.stringify(this.total));
      }
    }
  }

  removeIngredients(idClick: number) {
    for (let i: any = 0; i < this.total.length; i++) {
      for (let j: any = 0; j < this.total[i].optional.length; j++) {
        let idNum = this.total[i].optional[j].id;
        let order = this.total[i].order;
        let filteredArr = this.total[i].optional.filter((item: any) => {
          try {
            if (item.id === idClick) {
              this.total[i].optional = this.total[i].optional.filter((item: any) => {
                return item.id !== idClick;
              });
              this.total[i].shownPrice = this.total[i].shownPrice - item.price;
              this.total[i].optional[j].price;
              localStorage.setItem('burger', JSON.stringify(this.total));
            }
          } catch (error) {
            localStorage.setItem('burger', JSON.stringify(this.total));
          }
        });
      }
    }
  }

  removeAll() {
    this.total = [];
    localStorage.setItem('burger', JSON.stringify(this.total));
  }

  totalCost() {
    try {
      this.subSum = this.total.map((obj: any) => obj.shownPrice * obj.quantity);
      return this.subSum.reduce((a: any, b: any) => a + b);
    } catch (error) {
      return 0;
    }
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

  continueShoping() {
    this.router.navigate(['menu']);
  }

  btnMinus(id: number) {
    for (let i: any = 0; i < this.total.length; i++) {
      if (id === this.total[i].order && this.total[i].quantity > 1) {
        this.total[i].quantity--;
        localStorage.setItem('burger', JSON.stringify(this.total));
      }
    }
  }

  btnPlus(id: number) {
    for (let i: any = 0; i < this.total.length; i++) {
      if (id === this.total[i].order) {
        this.total[i].quantity++;
        localStorage.setItem('burger', JSON.stringify(this.total));
      }
    }
  }

  btnCheckout() {
    if (!this.total[0]) {
      this.openSnackBar("You can't go further without atleast one burger in your cart!");
    } else {
      this.router.navigate(['checkout']);
    }
  }

  localCheck() {
    if (this.objectsString == null) {
      this.local = false;
    }
  }

  localFix() {
    this.total = [];
    localStorage.setItem('burger', JSON.stringify(this.total));
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 2000 });
  }
}
