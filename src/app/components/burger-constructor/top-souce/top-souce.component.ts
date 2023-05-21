import { Component } from '@angular/core';
import { Ingredient } from '../../../interfaces/ingredient';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgerConstructorComponent } from '../burger-constructor.component';

@Component({
  selector: 'app-top-souce',
  templateUrl: './top-souce.component.html',
  styleUrls: ['./top-souce.component.scss']
})
export class TopSouceComponent {
  ingredients: Ingredient[] = [];
  newIngredient: any;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'sauce') {
          this.ingredients.push(ingredient);
        }
      });
    });
  }

  changeSauce(cod: number, event: any) {
    this.burgerConstruct.topSauces.forEach((ingredient: Ingredient, idx: number) => {
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
        this.burgerConstruct.topSauces.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.topSauceLength = 0;
        this.burgerConstruct.topSaucesPrice = 0;
        this.burgerConstruct.topSaucesGrams = 0;
        this.burgerConstruct.topSaucesPics = [];
        this.burgerConstruct.topSauces.forEach((ingredient: Ingredient) => {
          if (ingredient.name !== '-') {
            this.burgerConstruct.topSauceLength++;
            this.burgerConstruct.topSaucesPrice += ingredient.price;
            this.burgerConstruct.topSaucesGrams += ingredient.grams;
            this.burgerConstruct.topSaucesPics.push(ingredient);
          }
        });
      }
    });
  }

  deleteSauce(id: number) {
    this.burgerConstruct.topSauces.forEach((ingredient: Ingredient, index: number) => {
      if (id == ingredient.index) {
        this.burgerConstruct.topSauces.splice(index, 1);
      }
    });
    this.burgerConstruct.topSauceLength = 0;
    this.burgerConstruct.topSaucesPrice = 0;
    this.burgerConstruct.topSaucesGrams = 0;
    this.burgerConstruct.topSaucesPics = [];
    this.burgerConstruct.topSauces.forEach((ingredient: Ingredient) => {
      if (ingredient.name !== '-') {
        this.burgerConstruct.topSauceLength++;
        this.burgerConstruct.topSaucesPrice += ingredient.price;
        this.burgerConstruct.topSaucesGrams += ingredient.grams;
        this.burgerConstruct.topSaucesPics.push(ingredient);
      }
    });
  }
}
