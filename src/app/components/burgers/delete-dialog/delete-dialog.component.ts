import { Component } from '@angular/core';
import { BurgersService } from '../../../services/burgers.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(private _burgersService: BurgersService) {}
  confirmDelete() {
    let id;
    id = localStorage.getItem('deleteItem');
    this._burgersService.deleteBurger(id);
  }
  ngOnDestroy() {
    localStorage.removeItem('deleteItem');
  }
}
