import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IngredientsService } from '../../../services/ingredients.service';
import { BurgersService } from '../../../services/burgers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-burger',
  templateUrl: './edit-burger.component.html',
  styleUrls: ['./edit-burger.component.scss']
})
export class EditBurgerComponent implements OnInit {
  newPic: any;
  burgerForm: FormGroup;
  constructor(
    public _ingredientsService: IngredientsService,
    private _burgersService: BurgersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.burgerForm = new FormGroup({
      name: new FormControl(this._burgersService.currentBurger.name, [
        Validators.required,
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')
      ]),
      baseIngredients: new FormControl(this._burgersService.currentBurger.baseIngredients, Validators.required),
      optionalIngredients: new FormControl(this._burgersService.currentBurger.optionalIngredients),
      url: new FormControl('')
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
    }

    newReader.onload = (ev) => {
      this.newPic = newReader.result;
    };
  }
  editBurger() {
    if (this.newPic === undefined) {
      this.newPic = this._burgersService.currentBurger.url;
    }
    const updatedBurger = {
      id: this._burgersService.currentBurger.id,
      name: this.burgerForm.value.name,
      baseIngredients: this.burgerForm.value.baseIngredients,
      optionalIngredients: this.burgerForm.value.optionalIngredients,
      url: this.newPic
    };
    this._burgersService.updateBurger(this._burgersService.currentBurger.id, updatedBurger);
  }
  openSnackBar(text: string) {
    this._snackBar.open(text, '', { duration: 1000 });
  }
}
