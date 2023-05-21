import { HttpClient, HttpParameterCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { find } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userservice: UsersService,
    private _snackBar: MatSnackBar
  ) {}
  user: any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)])
    });
  }

  login() {
    this.userservice.getUsers().subscribe((res) => {
      this.user = res.find((item: any) => {
        return item.email === this.loginForm.value.email && item.password === this.loginForm.value.password;
      });
      if (this.user) {
        localStorage.setItem('username', this.user.username);
        localStorage.setItem('userId', this.user.id);
        localStorage.setItem('role', this.user.role);
        localStorage.setItem('token', '3434');
        this.loginForm.reset();
        this.router.navigate(['']);
      } else {
        this.openSnackBar('User not found!');
      }
    });
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 2000 });
  }
}
