import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BurgersService } from 'src/app/services/burgers.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    public _burgersService: BurgersService,
    private http: HttpClient
  ) {}
  paymentForm: FormGroup;
  inputField = new FormControl('');
  redirect = false;
  order: any = [];
  showError = false;
  ngOnInit() {
    this.userCheck();
    this.paymentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z ]*$'),
        Validators.minLength(1),
        Validators.maxLength(30)
      ]),
      card: new FormControl('', [
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19),
        Validators.pattern('^[0-9-]*$')
      ]),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern('^[0-9]*$')
      ])
    });
    this.getBurgersLocal();
  }
  getBurgersLocal() {
    const objectsString: any = localStorage.getItem('order');
    this.order = JSON.parse(objectsString);
  }

  payNow() {
    if (!this.paymentForm.valid) {
      this.paymentForm.markAllAsTouched();
      this.showError = true;
    } else {
      this.showError = false;
      this.http.post('http://localhost:3000/orders', this.order).subscribe((res) => {
        localStorage.removeItem('order');
        localStorage.removeItem('burger');
      });
      this.router.navigate(['confirmation']);
    }
  }

  userCheck() {
    let role = this.authService.getRole();
    const objectsString: any = localStorage.getItem('burger');
    const total = JSON.parse(objectsString);

    if (role === 'customer' && total[0]) {
    } else {
      this.router.navigate(['']);
    }
  }

  cancelTransaction() {
    this.router.navigate(['']);
  }
}
