import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TodolistComponent } from './todolist/todolist.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ViewComponent } from './view/view.component';
import { TableComponent } from './table/table.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    HomeComponent,
    NavComponent,
    ViewComponent,
    TableComponent,
    CustomAlertComponent
  ],
  imports: [
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
