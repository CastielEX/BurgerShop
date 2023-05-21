import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = 'http://localhost:3000/users/';
  backUser: any;
  allUsers: User[] = [];
  users: any = [];
  currentUser: any;
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  getBackUser() {
    return this.http.get('http://localhost:3300/profile');
  }
  getUsers2() {
    this.http.get(this.usersUrl).subscribe((users) => {
      this.users = users;
    });
  }
  getUserId(id: number) {
    this.allUsers.find((p) => {
      return (p.id = id);
    });
  }
  updateRole(id: number, updatedRole: User) {
    this.users.forEach((user: User, index: number) => {
      if (user.id == id) {
        this.users.splice(index, 1, updatedRole);
      }
    });
    this.http.put(`${this.usersUrl}/${id}`, updatedRole).subscribe();
  }
}
