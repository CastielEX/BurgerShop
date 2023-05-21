import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Burger } from '../interfaces/burger';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BurgersService {
  burgersURL = 'http://localhost:3000/burgers';
  burgers: any = [];
  currentBurger: Burger;
  constructor(private http: HttpClient) {}
  getBurgers() {
    this.http.get(this.burgersURL).subscribe((burgers) => {
      this.burgers = burgers;
    });
  }
  getBurgers2() {
    return this.http.get(this.burgersURL);
  }
  postBurger(burger: Burger) {
    this.burgers.push(burger);
    this.http.post<Burger>(this.burgersURL, burger).subscribe((response) => {
      this.getBurgers();
    });
  }
  deleteBurger(id: any) {
    this.http.delete<Burger[]>(`${this.burgersURL}/${id}`).subscribe();
    this.burgers.forEach((burger: any, index: number) => {
      if (burger.id == id) {
        this.burgers.splice(index, 1);
      }
    });
  }
  updateBurger(id: number, updatedBurger: Burger) {
    this.burgers.forEach((burger: Burger, index: number) => {
      if (burger.id == id) {
        this.burgers.splice(index, 1, updatedBurger);
      }
    });
    this.http.put(`${this.burgersURL}/${id}`, updatedBurger).subscribe();
  }

  getBurgerCart(): Observable<Burger[]> {
    return this.http.get<Burger[]>(this.burgersURL);
  }
}
