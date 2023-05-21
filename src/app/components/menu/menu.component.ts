import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BurgersService } from 'src/app/services/burgers.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    public _burgersService: BurgersService,
    private authService: AuthService,
    private router: Router,
    private _matSnackBar: MatSnackBar
  ) {}
  burgers: any;
  selected: any = false;
  ngOnInit() {
    let role = this.authService.getRole();
    if (role === 'customer') {
    } else {
      this.router.navigate(['']);
    }
    this._burgersService.getBurgers2().subscribe((res) => {
      this.burgers = res;
      this.burgers.forEach((element: any) => {
        let basePrice: number = 0;
        element.baseIngredients.forEach((element: any) => {
          basePrice += element.price;
        });
        element.price = basePrice;
        element.optional = [];
        element.quantity = 1;
        element.shownPrice = element.price;
        element.baseArray = element.baseIngredients.map((ingredient: any) => ingredient.name).join(', ');
      });
    });
  }
  selectedCheckbox(burger: any, id: number, name: string, price: number) {
    if (burger && this.selected) {
      this.selected = !this.selected;
      burger.optional.push({ id: id, name: name, price: price });
      burger.optional.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
      burger.shownPrice += price;
    } else {
      const index = burger.optional.findIndex((item: any) => item.id === id);
      burger.optional.splice(index, 1);
      burger.shownPrice -= price;
      burger.optional.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    }
  }
  toCart(burger: any) {
    burger = {
      id: burger.id,
      name: burger.name,
      price: burger.price,
      shownPrice: burger.shownPrice,
      baseIngredients: burger.baseIngredients,
      optionalIngredients: [],
      optional: burger.optional,
      quantity: burger.quantity,
      url: burger.url
    };
    const localStorageContent = localStorage.getItem('burger');
    let burgers: any[] = [];
    let count: number = 0;
    let burgersArray: any[] = [];
    let burgersIngredients: any[] = [];
    let newBurgerIngredients: any[] = [];
    if (localStorageContent === null) {
      burgers = [];
    } else {
      burgers = JSON.parse(localStorageContent);
    }
    burgers.forEach((item: any) => {
      burgersArray.push(item);
    });
    burgersArray.forEach((burger1: any) => {
      burgersIngredients = [];
      burger.optional.forEach((ingredient: any) => {
        burgersIngredients.push(ingredient.name);
      });
      newBurgerIngredients = [];
      burger1.optional.forEach((burger: any) => {
        newBurgerIngredients.push(burger.name);
      });
      if (burger.name === burger1.name && burgersIngredients.join('') === newBurgerIngredients.join('')) {
        count++;
      }
    });
    if (count === 0) {
      burgers.push(burger);
      localStorage.setItem('burger', JSON.stringify(burgers));
      this.openSnackBar('Order added!');
    } else {
      this.openSnackBar('Already in Cart');
    }
    burger.shownPrice = burger.price;
    for (let i = 0; i < this.burgers.length; i++) {
      this.burgers[i].optional = [];
      this.burgers[i].shownPrice = this.burgers[i].price;
    }
    this.selected = null;
    setTimeout(() => {
      this.selected = false;
    }, 50);
  }
  openSnackBar(text: string) {
    this._matSnackBar.open(text, '', { duration: 1000 });
  }
}
