import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../../interfaces/ingredient';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgerConstructorComponent } from '../burger-constructor.component';

@Component({
  selector: 'app-meat',
  templateUrl: './meat.component.html',
  styleUrls: ['./meat.component.scss']
})
export class MeatComponent implements OnInit {
  ingredients: Ingredient[] = [];
  newIngredient: Ingredient;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'meat') {
          this.ingredients.push(ingredient);
        }
      });
    });
  }

  changeMeat(cod: number, value: any) {
    this.burgerConstruct.meats.forEach((ingredient: Ingredient, idx: number) => {
      if (cod === ingredient.index) {
        this.ingredients.forEach((ingredient: Ingredient) => {
          if (ingredient.name === value) {
            this.newIngredient = {
              name: ingredient.name,
              id: ingredient.id,
              price: ingredient.price,
              grams: ingredient.grams,
              url: ingredient.url,
              index: cod
            };
          }
        });
        this.burgerConstruct.meats.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.meatsPrice = 0;
        this.burgerConstruct.meatsGrams = 0;
        this.burgerConstruct.meats.forEach((ingredient: Ingredient) => {
          this.burgerConstruct.meatsPrice += ingredient.price;
          this.burgerConstruct.meatsGrams += ingredient.grams;
        });
      }
    });
  }

  deleteMeat(id: number) {
    this.burgerConstruct.meats.forEach((ingredient: Ingredient, index: number) => {
      if (id == ingredient.index) {
        this.burgerConstruct.meats.splice(index, 1);
      }
    });
    this.burgerConstruct.meatsLength = this.burgerConstruct.meats.length;
    this.burgerConstruct.meatsPrice = 0;
    this.burgerConstruct.meats.forEach((ingredient: Ingredient) => {
      this.burgerConstruct.meatsPrice += ingredient.price;
    });
  }
}
