import { Component, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../Services/task.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  constructor(public sendservice:TaskService){}

  public btnClick( taskForm: any): void{
    this.sendservice.onSubmit(taskForm)
  }



}