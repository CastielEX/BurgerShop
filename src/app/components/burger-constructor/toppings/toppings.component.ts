import { Component } from '@angular/core';
import { Ingredient } from '../../../interfaces/ingredient';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgerConstructorComponent } from '../burger-constructor.component';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.scss']
})
export class ToppingsComponent {
  ingredients: Ingredient[] = [];
  newIngredient: any;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'toppings') {
          this.ingredients.push(ingredient);
        }
      });
    });
  }
  changeTopping(cod: number, event: any) {
    this.burgerConstruct.toppings.forEach((ingredient: Ingredient, idx: number) => {
      if (cod === ingredient.index) {
        this.ingredients.forEach((ingredient: Ingredient) => {
          if (ingredient.name === event) {
            this.newIngredient = {
              name: ingredient.name,
              id: ingredient.id,
              price: ingredient.price,
              grams: ingredient.grams,
              url: ingredient.url,
              index: cod
            };
          } else if (event === undefined) {
            this.newIngredient = {
              name: '-',
              index: cod
            };
          }
        });
        this.burgerConstruct.toppings.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.toppingsLength = 0;
        this.burgerConstruct.toppingsPrice = 0;
        this.burgerConstruct.toppingsGrams = 0;
        this.burgerConstruct.toppingsPics = [];
        this.burgerConstruct.toppings.forEach((ingredient: Ingredient) => {
          if (ingredient.name !== '-') {
            this.burgerConstruct.toppingsLength++;
            this.burgerConstruct.toppingsPrice += ingredient.price;
            this.burgerConstruct.toppingsGrams += ingredient.grams;
            this.burgerConstruct.toppingsPics.push(ingredient);
          }
        });
      }
    });
  }
  deleteTopping(id: number) {
    this.burgerConstruct.toppings.forEach((ingredient: Ingredient, index: number) => {
      if (id == ingredient.index) {
        this.burgerConstruct.toppings.splice(index, 1);
      }
    });
    this.burgerConstruct.toppingsLength = 0;
    this.burgerConstruct.toppingsPrice = 0;
    this.burgerConstruct.toppingsGrams = 0;
    this.burgerConstruct.toppingsPics = [];
    this.burgerConstruct.toppings.forEach((ingredient: Ingredient) => {
      if (ingredient.name !== '-') {
        this.burgerConstruct.toppingsLength++;
        this.burgerConstruct.toppingsPrice += ingredient.price;
        this.burgerConstruct.toppingsGrams += ingredient.grams;
        this.burgerConstruct.toppingsPics.push(ingredient);
      }
    });
  }
}
