import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BurgerConstructorComponent } from './components/burger-constructor/burger-constructor.component';
import { CreateBurgerComponent } from './components/burgers/create-burger/create-burger.component';
import { EditBurgerComponent } from './components/burgers/edit-burger/edit-burger.component';
import { BurgersComponent } from './components/burgers/burgers.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { BunComponent } from './components/burger-constructor/bun/bun.component';
import { MeatComponent } from './components/burger-constructor/meat/meat.component';
import { BottomSouceComponent } from './components/burger-constructor/bottom-souce/bottom-souce.component';
import { TopSouceComponent } from './components/burger-constructor/top-souce/top-souce.component';
import { CheeseComponent } from './components/burger-constructor/cheese/cheese.component';
import { ToppingsComponent } from './components/burger-constructor/toppings/toppings.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { DeleteDialogComponent } from './components/burgers/delete-dialog/delete-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { PaymentComponent } from './components/payment/payment.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { EditIngredientComponent } from './components/ingredients/edit-ingredient/edit-ingredient.component';
import { DeleteComponent } from './components/ingredients/delete/delete.component';
import { CreateComponent } from './components/ingredients/create/create.component';
import { EditRoleComponent } from './components/users/edit-role/edit-role.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    UsersComponent,
    MenuComponent,
    ShoppingCartComponent,
    BurgerConstructorComponent,
    CreateBurgerComponent,
    EditBurgerComponent,
    BurgersComponent,
    BunComponent,
    MeatComponent,
    BottomSouceComponent,
    TopSouceComponent,
    CheeseComponent,
    ToppingsComponent,
    CheckoutComponent,
    DeleteDialogComponent,
    PaymentComponent,
    IngredientsComponent,
    EditIngredientComponent,
    DeleteComponent,
    CreateComponent,
    EditRoleComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    NgSelectModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
