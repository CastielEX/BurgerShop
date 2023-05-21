import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { IngredientsService } from '../../services/ingredients.service';
import { Ingredient } from '../../interfaces/ingredient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { count } from 'rxjs';

@Component({
  selector: 'app-burger-constructor',
  templateUrl: './burger-constructor.component.html',
  styleUrls: ['./burger-constructor.component.scss']
})
export class BurgerConstructorComponent implements OnInit {
  ingredients: any = [];
  indexBun = 0;
  index = 0;
  indexSauceBottom = 0;
  indexSauceTop = 0;
  indexCheese = 0;
  indexTopping = 0;
  buns: any = [];
  newBun: any;
  bunsLength: number;
  bunsPrice = 0;
  bunsGrams = 0;
  meats: any = [];
  meatsLength: number;
  meatsPrice = 0;
  meatsGrams = 0;
  newMeat: any;
  bottomSauces: any = [];
  bottomSaucesPics: any = [];
  bottomSauceLength: number = 0;
  bottomSaucesPrice: number = 0;
  bottomSaucesGrams: number = 0;
  topSauces: any = [];
  topSaucesPics: any = [];
  topSauceLength: number = 0;
  topSaucesPrice: number = 0;
  topSaucesGrams: number = 0;
  cheeses: any = [];
  cheesesPics: any = [];
  cheesesLength: number = 0;
  cheesesPrice: number = 0;
  cheesesGrams: number = 0;
  toppings: any = [];
  toppingsPics: any = [];
  toppingsLength: number = 0;
  toppingsPrice: number = 0;
  toppingsGrams: number = 0;
  burgerName: string = 'Crafted Burger';
  burgersOrder: any = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private _ingredientsService: IngredientsService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      this.ingredients = res;
      let count = 0;
      res.forEach((ingredient: any) => {
        if (ingredient.category === 'bun' && count === 0) {
          count++;
          this.newBun = ingredient;
        }
      });
      count = 0;
      res.forEach((ingredient: any) => {
        if (ingredient.category === 'meat' && count === 0) {
          count++;
          this.newMeat = ingredient;
        }
      });
      this.addBun();
      this.addMeat();
      this.addBottomSauce();
      this.addTopSauce();
      this.addCheese();
      this.addTopping();
    });
    let role = this.authService.getRole();
    if (role === 'customer') {
    } else {
      this.router.navigate(['']);
    }
  }
  addMeat() {
    this.index++;
    const newMeat = {
      id: this.newMeat.id,
      name: this.newMeat.name,
      category: this.newMeat.category,
      price: this.newMeat.price,
      grams: this.newMeat.grams,
      url: this.newMeat.url,
      index: this.index
    };
    this.meats.push(newMeat);
    this.meatsLength = this.meats.length;
    this.meatsPrice = 0;
    this.meatsGrams = 0;
    this.meats.forEach((ingredient: Ingredient) => {
      this.meatsPrice += ingredient.price;
      this.meatsGrams += ingredient.grams;
    });
  }
  addBun() {
    this.indexBun++;
    const newBun = {
      id: this.newBun.id,
      name: this.newBun.name,
      category: this.newBun.category,
      price: this.newBun.price,
      grams: this.newBun.grams,
      url: this.newBun.url,
      index: this.indexBun
    };
    this.buns.push(newBun);
    this.bunsLength = this.buns.length;
    this.bunsPrice = 0;
    this.bunsGrams = 0;
    this.buns.forEach((ingredient: Ingredient) => {
      this.bunsPrice += ingredient.price;
      this.bunsGrams += ingredient.grams;
    });
  }
  addBottomSauce() {
    this.indexSauceBottom++;
    const newSauce = {
      name: '-',
      index: this.indexSauceBottom
    };
    this.bottomSauces.push(newSauce);
  }
  addTopSauce() {
    this.indexSauceTop++;
    const newSauce = {
      name: '-',
      index: this.indexSauceTop
    };
    this.topSauces.push(newSauce);
  }
  addCheese() {
    this.indexCheese++;
    const newCheese = {
      name: '-',
      index: this.indexCheese
    };
    this.cheeses.push(newCheese);
  }
  addTopping() {
    this.indexTopping++;
    const newTopping = {
      name: '-',
      index: this.indexTopping
    };
    this.toppings.push(newTopping);
  }
  addToCart() {
    let local = localStorage.getItem('burger');
    this.burgersOrder = [];
    const optional = [
      this.ingredients,
      ...this.meats,
      ...this.bottomSaucesPics,
      ...this.topSaucesPics,
      ...this.cheesesPics,
      ...this.toppingsPics
    ];
    if (this.burgerName === '' || this.burgerName === undefined) {
      this.burgerName = 'Crafted burger';
    }
    const newBurger: any = {
      name: this.burgerName,
      baseIngredients: [],
      optional: [],
      optionalIngredients: optional,
      shownPrice:
        +this.bunsPrice +
        +this.meatsPrice +
        +this.bottomSaucesPrice +
        +this.topSaucesPrice +
        +this.cheesesPrice +
        +this.toppingsPrice,
      url: '../assets/images/burger-crafted.png',
      quantity: 1,
      price:
        +this.bunsPrice +
        +this.meatsPrice +
        +this.bottomSaucesPrice +
        +this.topSaucesPrice +
        +this.cheesesPrice +
        +this.toppingsPrice
    };

    if (local !== null) {
      let ingredientsNewBurger: any = [];
      let ingredientsBurger: any = [];
      let count = 0;
      const burgers = JSON.parse(local);
      burgers.forEach((item: any) => {
        this.burgersOrder.push(item);
      });
      this.burgersOrder.forEach((burger: any) => {
        ingredientsBurger = [];
        burger.optionalIngredients.forEach((ingredient: any) => {
          ingredientsBurger.push(ingredient.name);
        });
        ingredientsNewBurger = [];
        newBurger.optionalIngredients.forEach((ingredient: any) => {
          ingredientsNewBurger.push(ingredient.name);
        });
        if (ingredientsNewBurger.sort().join('') === ingredientsBurger.sort().join('')) {
          count++;
        }
      });
      if (count === 0) {
        this.burgersOrder.push(newBurger);
        localStorage.setItem('burger', JSON.stringify(this.burgersOrder));
        this.openSnackBar('Order added!');
        this.startScratch();
      } else {
        this.openSnackBar('Already exists in your cart!');
      }
    } else {
      this.burgersOrder.push(newBurger);
      localStorage.setItem('burger', JSON.stringify(this.burgersOrder));
      this.startScratch();
      this.openSnackBar('Order added');
    }
  }
  startScratch() {
    this.index = 0;
    this.indexSauceBottom = 0;
    this.indexSauceTop = 0;
    this.indexCheese = 0;
    this.indexTopping = 0;
    this.meats = [];
    this.meatsLength = 0;
    this.meatsPrice = 0;
    this.meatsGrams = 0;
    this.addMeat();
    this.bottomSauces = [];
    this.bottomSaucesPics = [];
    this.bottomSauceLength = 0;
    this.bottomSaucesPrice = 0;
    this.bottomSaucesGrams = 0;
    this.addBottomSauce();
    this.topSauces = [];
    this.topSaucesPics = [];
    this.topSauceLength = 0;
    this.topSaucesPrice = 0;
    this.topSaucesGrams = 0;
    this.addTopSauce();
    this.cheeses = [];
    this.cheesesPics = [];
    this.cheesesLength = 0;
    this.cheesesPrice = 0;
    this.cheesesGrams = 0;
    this.addCheese();
    this.toppings = [];
    this.toppingsPics = [];
    this.toppingsLength = 0;
    this.toppingsPrice = 0;
    this.toppingsGrams = 0;
    this.addTopping();
    this.burgerName = 'Crafted Burger';
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 1000 });
  }
}
