import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../../services/ingredients.service';
import { IngredientsComponent } from '../ingredients.component';
import { Ingredient } from '../../../interfaces/ingredient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {
  ingredientForm: FormGroup;
  submitted: boolean = false;
  image: any;
  constructor(private _ingredientsService: IngredientsService, private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl(this.capitalize(this._ingredientsService.currentIngredient.name), [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')
      ]),
      price: new FormControl(this._ingredientsService.currentIngredient.price, [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      grams: new FormControl(this._ingredientsService.currentIngredient.grams, [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      url: new FormControl(''),
      category: new FormControl(this._ingredientsService.currentIngredient.category)
    });
  }

  getNewImage(event: any) {
    const newReader = new FileReader();
    const newFile = event.target.files[0];
    const mimeType = event.target.files[0].type;
    newReader.readAsDataURL(newFile);

    if (mimeType.match(/image\/*/) == null) {
      this.openSnackBar('Only images allowed!');
      return;
    } else {
      newReader.onload = (ev) => {
        this.image = newReader.result;
      };
    }
  }
  ngDoCheck() {
    if (this.ingredientForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
  editIngredient() {
    if (this.image === undefined) {
      this.image = this._ingredientsService.currentIngredient.url;
    }
    const updatedIngredient: Ingredient = {
      id: this._ingredientsService.currentIngredient.id,
      name: this.ingredientForm.value.name.toLowerCase(),
      category: this.ingredientForm.value.category,
      price: this.ingredientForm.value.price,
      grams: this.ingredientForm.value.grams,
      url: this.image
    };
    this._ingredientsService.updateIngredient(this._ingredientsService.currentIngredient.id, updatedIngredient);
  }
  capitalize(word: string) {
    return word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 1000 });
  }
}
