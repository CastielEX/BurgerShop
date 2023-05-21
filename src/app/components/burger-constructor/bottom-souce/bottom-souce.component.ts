import { Component } from '@angular/core';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgerConstructorComponent } from '../burger-constructor.component';
import { Ingredient } from '../../../interfaces/ingredient';

@Component({
  selector: 'app-bottom-souce',
  templateUrl: './bottom-souce.component.html',
  styleUrls: ['./bottom-souce.component.scss']
})
export class BottomSouceComponent {
  ingredients: Ingredient[] = [];
  selectedSauce: string;
  newIngredient: any;
  constructor(public _ingredientsService: IngredientsService, public burgerConstruct: BurgerConstructorComponent) {}

  ngOnInit() {
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        if (ingredient.category === 'sauce') {
          this.ingredients.push(ingredient);
        }
      });
      this.selectedSauce = '-';
    });
  }

  changeSauce(cod: number, event: any) {
    this.burgerConstruct.bottomSauces.forEach((ingredient: Ingredient, idx: number) => {
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
        this.burgerConstruct.bottomSauces.splice(idx, 1, this.newIngredient);
        this.burgerConstruct.bottomSauceLength = 0;
        this.burgerConstruct.bottomSaucesPrice = 0;
        this.burgerConstruct.bottomSaucesGrams = 0;
        this.burgerConstruct.bottomSaucesPics = [];
        this.burgerConstruct.bottomSauces.forEach((ingredient: Ingredient) => {
          if (ingredient.name !== '-') {
            this.burgerConstruct.bottomSauceLength++;
            this.burgerConstruct.bottomSaucesPrice += ingredient.price;
            this.burgerConstruct.bottomSaucesGrams += ingredient.grams;
            this.burgerConstruct.bottomSaucesPics.push(ingredient);
          }
        });
      }
    });
  }

  deleteSauce(id: number) {
    this.burgerConstruct.bottomSauces.forEach((ingredient: Ingredient, index: number) => {
      if (id == ingredient.index) {
        this.burgerConstruct.bottomSauces.splice(index, 1);
      }
    });
    this.burgerConstruct.bottomSauceLength = 0;
    this.burgerConstruct.bottomSaucesPrice = 0;
    this.burgerConstruct.bottomSaucesGrams = 0;
    this.burgerConstruct.bottomSaucesPics = [];
    this.burgerConstruct.bottomSauces.forEach((ingredient: Ingredient) => {
      if (ingredient.name !== '-') {
        this.burgerConstruct.bottomSauceLength++;
        this.burgerConstruct.bottomSaucesPrice += ingredient.price;
        this.burgerConstruct.bottomSaucesGrams += ingredient.grams;
        this.burgerConstruct.bottomSaucesPics.push(ingredient);
      }
    });
  }
}
