import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../../../services/ingredients.service';
import { Ingredient } from '../../../interfaces/ingredient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  ingredientForm: FormGroup;
  submitted: boolean = true;
  image: any;
  constructor(private _ingredientsService: IngredientsService, private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      grams: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      url: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  getImage(event: any) {
    const newReader = new FileReader();
    const newFile = event.target.files[0];
    const mimeType = event.target.files[0].type;
    newReader.readAsDataURL(newFile);

    if (mimeType.match(/image\/*/) == null) {
      return;
    } else {
      newReader.onload = (ev) => {
        this.image = newReader.result;
      };
    }
  }
  addIngredient() {
    this.submitted = true;
    const newIngredient: Ingredient = {
      name: this.ingredientForm.value.name.toLowerCase(),
      category: this.ingredientForm.value.category,
      price: this.ingredientForm.value.price,
      grams: this.ingredientForm.value.grams,
      url: this.image
    };
    this._ingredientsService.addIngredient(newIngredient);
    setTimeout(() => {
      this._ingredientsService.getIngredients().subscribe((res: any) => {
        this._ingredientsService.allIngredients = res;
      }),
        150;
    });
  }

  formSubmit() {
    this.submitted = false;
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 1000 });
  }
}
