import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodolistComponent } from './todolist/todolist.component';
import { ViewComponent } from './view/view.component';
import { TableComponent } from './table/table.component'
const routes: Routes = [
  { path: '', component: TodolistComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: 'view', component: ViewComponent },
  { path: 'table', component: TableComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
