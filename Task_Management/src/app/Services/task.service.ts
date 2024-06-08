import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../custom-alert/custom-alert.component';


interface Task {
  taskName: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  status: string;
  personID: string;
  personName: string;
  editing: boolean; // Add the editing property
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  taskArray: Task[] = [];
  editingIndex: number | null = null;
  selectedTask: Task = {} as Task;
  isNewTask: boolean = true;
  statusFilter: string = '';
  searchErrorMessage: string = '';
  personIDnameSearch: string = '';

  constructor(private dialog: MatDialog) {}

  onSubmit(taskForm: any) {
    this.taskArray.push({
      taskName: taskForm.value.task,
      description: taskForm.value.description,
      isCompleted: false,
      dueDate: new Date(taskForm.value.dueDate),
      status: 'InProgress',
      personID: taskForm.value.personID,
      personName: taskForm.value.personName,
      editing: false 
    });
    taskForm.resetForm();
    this.openCustomAlert('Task successfully added');
    console.log(this.taskArray);
  }

  private showAlert(message: string) {
    alert(message);
  }
  openCustomAlert(message: string): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '400px',
      data: { title: 'Success', message: message }
    });
  }
}
