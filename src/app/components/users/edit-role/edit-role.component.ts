import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent {
  constructor(public userService: UsersService) {}
  roles: string[] = ['admin', 'customer'];
  role: string;
  users: any = [];
  onChange(e: any) {
    this.role = e.target.value;
  }
  onSubmit() {
    const changeRole = {
      id: this.userService.currentUser.id,
      username: this.userService.currentUser.username,
      email: this.userService.currentUser.email,
      password: this.userService.currentUser.password,
      role: this.role
    };
    this.userService.updateRole(this.userService.currentUser.id, changeRole);
  }
}
