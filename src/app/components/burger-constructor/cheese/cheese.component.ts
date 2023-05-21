import { Component } from '@angular/core';
import { Ingredient } from '../../../interfaces/ingredient';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgerConstructorComponent } from '../burger-constructor.component';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrls: ['./cheese.component.scss']
})
export class CheeseComponent {
  ingredients: Ingredient[] = [];
  newIngredient: any;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'cheese') {
          this.ingredients.push(ingredient);
        }
      });
    });
  }

  changeCheese(cod: number, event: any) {
    this.burgerConstruct.cheeses.forEach((ingredient: Ingredient, idx: number) => {
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
        this.burgerConstruct.cheeses.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.cheesesLength = 0;
        this.burgerConstruct.cheesesPrice = 0;
        this.burgerConstruct.cheesesGrams = 0;
        this.burgerConstruct.cheesesPics = [];
        this.burgerConstruct.cheeses.forEach((ingredient: Ingredient) => {
          if (ingredient.name !== '-') {
            this.burgerConstruct.cheesesLength++;
            this.burgerConstruct.cheesesPrice += ingredient.price;
            this.burgerConstruct.cheesesGrams += ingredient.grams;
            this.burgerConstruct.cheesesPics.push(ingredient);
          }
        });
      }
    });
  }

  deleteCheese(id: number) {
    this.burgerConstruct.cheeses.forEach((ingredient: Ingredient, index: number) => {
      if (id == ingredient.index) {
        this.burgerConstruct.cheeses.splice(index, 1);
      }
    });
    this.burgerConstruct.cheesesLength = 0;
    this.burgerConstruct.cheesesPrice = 0;
    this.burgerConstruct.cheesesGrams = 0;
    this.burgerConstruct.cheesesPics = [];
    this.burgerConstruct.cheeses.forEach((ingredient: Ingredient) => {
      if (ingredient.name !== '-') {
        this.burgerConstruct.cheesesLength++;
        this.burgerConstruct.cheesesPrice += ingredient.price;
        this.burgerConstruct.cheesesGrams += ingredient.grams;
        this.burgerConstruct.cheesesPics.push(ingredient);
      }
    });
  }
}
