import { Component } from '@angular/core';
import { BurgersService } from '../../services/burgers.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IngredientsService } from '../../services/ingredients.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { CreateBurgerComponent } from '../burgers/create-burger/create-burger.component';
import { DeleteDialogComponent } from '../burgers/delete-dialog/delete-dialog.component';
import { EditBurgerComponent } from '../burgers/edit-burger/edit-burger.component';
import { Ingredient } from '../../interfaces/ingredient';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  deleteConfirm: any;
  ingredients: Ingredient[] = [];
  constructor(
    public dialog: MatDialog,
    public _ingredientsService: IngredientsService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    let role = this.authService.getRole();
    if (role === 'admin') {
    } else {
      this.router.navigate(['']);
    }
    this._ingredientsService.getIngredients().subscribe((res: any) => {
      res.forEach((ingredient: Ingredient) => {
        this._ingredientsService.allIngredients.push(ingredient);
      });
    });
  }

  openEdit(id: any) {
    this._ingredientsService.currentIngredient = this._ingredientsService.allIngredients.find(
      (ingredient: Ingredient) => {
        return ingredient.id === id;
      }
    );
    this.dialog.open(EditIngredientComponent);
  }

  deleteDialog(id: any) {
    localStorage.setItem('deleteItem', id);
    this.dialog.open(DeleteComponent);
  }

  openDialog() {
    this.dialog.open(CreateComponent);
  }
}
