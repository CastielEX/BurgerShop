import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BurgersService } from 'src/app/services/burgers.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  total: any = [];
  burger: any;
  burgerAll: any = [];
  redirect = false;
  showError = false;
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public _burgersService: BurgersService,
    private http: HttpClient
  ) {}
  checkoutForm: FormGroup;
  radioInputControl = new FormControl('', [Validators.required]);
  ngOnInit() {
    this.userCheck();
    this.checkoutForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$')
      ]),
      street: new FormControl('', Validators.required),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.pattern('^[0-9-.,/]*$')
      ])
    });
    const data: any = localStorage.getItem('burger');
    let dataArr: any = JSON.parse(data);
    this.getBurgersLocal();
    this.totalCost();

    const filterArr = dataArr.filter((item: any) => {
      this.burger = {
        name: item.name,
        price: item.shownPrice,
        quantity: item.quantity,
        ingredients: item.optional
      };

      this.burgerAll.push(this.burger);
    });
  }

  placeOrder(order: { email: string | number; phone: number; items: any }) {
    order = {
      email: this.checkoutForm.value.email,
      phone: this.checkoutForm.value.phone,
      items: this.burgerAll
    };
    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched();
      this.showError = true;
    } else {
      this.showError = false;
      localStorage.setItem('order', JSON.stringify(order));
      if (this.redirect) {
        this.router.navigate(['payment']);
      } else {
        this.http.post('http://localhost:3000/orders', order).subscribe((res) => {
          localStorage.removeItem('burger');
          localStorage.removeItem('order');
        });
        this.router.navigate(['confirmation']);
      }
    }
  }

  getBurgersLocal() {
    const objectsString: any = localStorage.getItem('burger');
    this.total = JSON.parse(objectsString);
  }

  subSum: any;
  sum: number;
  totalCost() {
    this.subSum = this.total.map((obj: any) => obj.shownPrice * obj.quantity);
    return this.subSum.reduce((a: any, b: any) => a + b);
  }

  backToCart() {
    this.router.navigate(['cart']);
  }

  toggleValueTrue() {
    this.redirect = true;
  }

  toggleValueFalse() {
    this.redirect = false;
  }

  popUpError() {
    let local = localStorage.getItem('burger');
    this.total == ![];
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 2000 });
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
}
