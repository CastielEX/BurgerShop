import { Component, OnInit } from '@angular/core';
import { BurgersService } from '../../services/burgers.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBurgerComponent } from './create-burger/create-burger.component';
import { IngredientsService } from '../../services/ingredients.service';
import { EditBurgerComponent } from './edit-burger/edit-burger.component';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.scss']
})
export class BurgersComponent implements OnInit {
  deleteConfirm: any;
  constructor(
    public _burgersService: BurgersService,
    public dialog: MatDialog,
    private _ingredientsService: IngredientsService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    let role = this.authService.getRole();
    if (role === 'admin') {
    } else {
      this.router.navigate(['']);
    }
    this._burgersService.getBurgers();
    this._ingredientsService.getIngredients().subscribe((response: any) => {
      this._ingredientsService.allIngredients = response;
    });
  }

  openDialog() {
    this.dialog.open(CreateBurgerComponent);
  }
  deleteDialog(id: any) {
    localStorage.setItem('deleteItem', id);
    this.dialog.open(DeleteDialogComponent);
  }
  openEdit(id: number) {
    this._burgersService.currentBurger = this._burgersService.burgers.find((burger: any) => {
      return burger.id === id;
    });
    this.dialog.open(EditBurgerComponent);
  }
}
