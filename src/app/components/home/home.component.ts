import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() user: User;
  allUsers: User[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit() {
    if (!!localStorage.getItem('username')) {
      setTimeout(() => {
        this.openSnackBar();
        localStorage.removeItem('username');
      }, 200);
    }
  }
  openSnackBar() {
    this._snackBar.open(`Welcome to our Community ${localStorage.getItem('username')}`, '', {
      duration: 5000
    });
  }
}
