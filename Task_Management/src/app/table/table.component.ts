import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../Services/task.service';
 
interface Task {
  taskName: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  status: string;
  personID: string;
  personName: string;
  editing: boolean;
 
}
 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  sortKey: string = '';
  sortAscending: boolean = true;
  originalValuesMap: Map<Task, any> = new Map();
 
 
  constructor(public sendservice: TaskService) { }
 
  sortWithPrompt(criteria: string) {
    if (this.sortKey === criteria) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortKey = criteria;
      this.sortAscending = true; // Start with ascending order by default
    }
    this.sortBy(criteria, this.sortAscending);
  }
 
  sortBy(criteria: string, ascending: boolean) {
    switch (criteria) {
      case 'personID':
        this.sendservice.taskArray.sort((a, b) => ascending ? a.personID.localeCompare(b.personID) : b.personID.localeCompare(a.personID));
        break;
      case 'personName':
        this.sendservice.taskArray.sort((a, b) => ascending ? a.personName.localeCompare(b.personName) : b.personName.localeCompare(a.personName));
        break;
      case 'taskName':
        this.sendservice.taskArray.sort((a, b) => ascending ? a.taskName.localeCompare(b.taskName) : b.taskName.localeCompare(a.taskName));
        break;
      case 'dueDate':
        this.sendservice.taskArray.sort((a, b) => ascending ? a.dueDate.getTime() - b.dueDate.getTime() : b.dueDate.getTime() - a.dueDate.getTime());
        break;
      default:
        break;
    }
  }
  isOverdue(dueDate: Date): boolean {
    return dueDate < new Date();
  }
 
 
  filterTasksByStatus(): Task[] {
    if (!this.sendservice.statusFilter || this.sendservice.statusFilter === '') {
      return this.sendservice.taskArray;
    } else {
      const filteredStatus = this.sendservice.statusFilter.trim().toLowerCase();
      return this.sendservice.taskArray.filter((task: Task) => task.status.toLowerCase() === filteredStatus);
    }
  }
 
  searchTasksByPersonIDName(): Task[] {
    if (!this.sendservice.personIDnameSearch.trim()) {
      return this.sendservice.taskArray;
    }
 
    const searchTerm = this.sendservice.personIDnameSearch.trim().toLowerCase();
 
    return this.sendservice.taskArray.filter((task: Task) =>
      task.personID.toLowerCase().startsWith(searchTerm) || task.personName.toLowerCase().startsWith(searchTerm)
    );
  }
 
  setStatus(index: number, status: string) {
    this.sendservice.taskArray[index].status = status;
  }
 
  editTask(index: number) {
  // Toggle editing mode for the selected task and exit edit mode for other tasks
  this.sendservice.taskArray.forEach((task, i) => {
    if (i === index) {
      task.editing = !task.editing;
      // Store original values before editing
      this.originalValuesMap.set(task, { ...task, originalDueDate: task.dueDate }); // Store original dueDate
    } else {
      task.editing = false;
    }
  });
}
 
 
  updateTask() {
    // Reset editing state
    this.sendservice.taskArray.forEach(task => task.editing = false);
    // Clear the original values map
    this.originalValuesMap.clear();
  }
 
  cancelEdit() {
    let changesDiscarded = false; // Flag to track if changes have been discarded
 
    // Reset editing state for all tasks
    this.sendservice.taskArray.forEach(task => {
      if (task.editing) {
        // Discard changes for the task
        Object.assign(task, this.originalValuesMap.get(task));
        task.editing = false;
        changesDiscarded = true; // Set flag to true since changes have been discarded for at least one task
      }
    });
 
    if (changesDiscarded) {
      // Clear the original values map only if changes have been discarded
      this.originalValuesMap.clear();
    }
  }
 
 
  onDelete(index: number) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      this.sendservice.taskArray.splice(index, 1);
    }
  }

}