import { Component } from '@angular/core';
import { BurgersService } from '../../../services/burgers.service';
import { IngredientsService } from '../../../services/ingredients.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(private _ingredientsService: IngredientsService) {}
  confirmDelete() {
    let id;
    id = localStorage.getItem('deleteItem');
    this._ingredientsService.deleteIngredient(id);
  }
  ngOnDestroy() {
    localStorage.removeItem('deleteItem');
  }
}
