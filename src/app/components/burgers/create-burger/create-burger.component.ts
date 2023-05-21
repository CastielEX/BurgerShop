import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../../../services/ingredients.service';
import { Ingredient } from '../../../interfaces/ingredient';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BurgersService } from '../../../services/burgers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-burger',
  templateUrl: './create-burger.component.html',
  styleUrls: ['./create-burger.component.scss']
})
export class CreateBurgerComponent implements OnInit {
  allIngredients: Ingredient[] = [];
  burgerForm: FormGroup;
  url: any;
  constructor(
    private _ingredientsService: IngredientsService,
    private _burgersService: BurgersService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.allIngredients = this._ingredientsService.allIngredients;

    this.burgerForm = new FormGroup<any>({
      name: new FormControl('', Validators.required),
      baseIngredients: new FormControl('', Validators.required),
      optionalIngredients: new FormControl(''),
      url: new FormControl('', Validators.required)
    });
  }

  getPicture(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    const mimeType = event.target.files[0].type;
    reader.readAsDataURL(file);

    if (mimeType.match(/image\/*/) == null) {
      this.openSnackBar('Only images allowed!');
      return;
    }

    reader.onload = () => {
      this.url = reader.result;
    };
  }
  createBurger(burger: any) {
    burger.url = this.url;
    this._burgersService.postBurger(burger);
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 1000 });
  }
}
