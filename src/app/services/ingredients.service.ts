import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../interfaces/ingredient';
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';
import { Burger } from '../interfaces/burger';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  ingredientsURL = 'http://localhost:3000/ingredients';
  allIngredients: Ingredient[] = [];
  currentIngredient: any;
  categoryItems: Ingredient[] = [];
  constructor(private http: HttpClient) {}

  getIngredients() {
    return this.http.get(this.ingredientsURL);
  }

  updateIngredient(id: number, updatedIngredient: Ingredient) {
    this.allIngredients.forEach((ingredient: Ingredient, index: number) => {
      if (ingredient.id == id) {
        this.allIngredients.splice(index, 1, updatedIngredient);
      }
    });
    this.http.patch(`${this.ingredientsURL}/${id}`, updatedIngredient).subscribe();
  }

  addIngredient(newIngredient: Ingredient) {
    this.http.post(`${this.ingredientsURL}`, newIngredient).subscribe();
  }

  deleteIngredient(id: any) {
    this.http.delete<Burger[]>(`${this.ingredientsURL}/${id}`).subscribe();
    this.allIngredients.forEach((ingredient: any, index: number) => {
      if (ingredient.id == id) {
        this.allIngredients.splice(index, 1);
      }
    });
  }
}
