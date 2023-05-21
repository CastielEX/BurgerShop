import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userservice: UsersService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  user: any;
  userName: any

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(25)])
    });
  }

  onSubmit(users: { username: string; email: string; password: string | number; role: string }) {
    users = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: 'customer'
    };

    this.userservice.getUsers().subscribe((res) => {
      this.user = res.find((item) => {
        return this.registerForm.value.email == item.email;
      });
      this.userName = res.find((item) => {
        return this.registerForm.value.username == item.username;
      });

      if (this.user) {
        this.openSnackBar('Email already exists!');
      } else if (this.userName) {
        this.openSnackBar("Username already exists!");
      } else if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.openSnackBar("Password don't match!");
      } else {
        this.http.post('http://localhost:3000/users', users).subscribe((res) => {
          this.router.navigate(['login']);
        });
      }
    });
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 2000 });
  }
}
