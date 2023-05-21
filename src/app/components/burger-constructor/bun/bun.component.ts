import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../../../services/ingredients.service';
import { Ingredient } from '../../../interfaces/ingredient';
import { BurgerConstructorComponent } from '../burger-constructor.component';

@Component({
  selector: 'app-bun',
  templateUrl: './bun.component.html',
  styleUrls: ['./bun.component.scss']
})
export class BunComponent implements OnInit {
  ingredients: Ingredient[] = [];
  selectedBun: string;
  private newIngredient: any;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'bun') {
          this.ingredients.push(ingredient);
        }
      });
      this.burgerConstruct.newBun = this.ingredients[0];
    });
  }
  changeBun(cod: number, value: any) {
    this.burgerConstruct.buns.forEach((ingredient: Ingredient, idx: number) => {
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
        this.burgerConstruct.buns.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.bunsGrams = 0;
        this.burgerConstruct.bunsPrice = 0;
        this.burgerConstruct.buns.forEach((ingredient: Ingredient) => {
          this.burgerConstruct.bunsPrice += ingredient.price;
          this.burgerConstruct.bunsGrams += ingredient.grams;
        });
      }
    });
  }
}
