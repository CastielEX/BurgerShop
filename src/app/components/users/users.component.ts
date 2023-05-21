import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditRoleComponent } from './edit-role/edit-role.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public userService: UsersService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    public _matDialog: MatDialog
  ) {}
  users: any = [];
  user: User;
  roles: string[] = ['admin', 'customer'];
  userId: number = Number(localStorage.getItem('userId'));
  ngOnInit() {
    let role = this.authService.getRole();
    if (role === 'admin') {
      this.userService.getUsers().subscribe((res) => {
        this.userService.users = res;
        this.users = this.userService.users;
      });
    } else {
      this.router.navigate(['']);
    }
    this.userService.getBackUser();
  }
  openDialog(id: number) {
    this.userService.currentUser = this.users.find((user: any) => {
      return user.id === id;
    });
    let dialogRef = this._matDialog.open(EditRoleComponent, {
      width: '400px'
    });
  }
}
