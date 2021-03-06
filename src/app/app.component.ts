import { Component, ViewChild, ElementRef } from '@angular/core';
import { remove, find } from 'lodash';
import { ToDoService } from './services/todo/todo.service';
import { DoneService } from './services/done/done.service';
import { CommonService } from './services/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  InputName: string;
  UpdateMode = false;
  IdToUpdate: string;
  ToDoList: Array<any>;
  DoneList: Array<any>;
  UpdateDone = false;
  InValid = true;

  @ViewChild('name') NameId: ElementRef;

  constructor(private toDoService: ToDoService, private doneService: DoneService, private commonService: CommonService) {
    this.ToDoList = [];
    this.DoneList = [];
  }

  updateElemet(id, name, updateDone?): void {
    this.IdToUpdate = id;
    this.InputName = name;
    this.NameId.nativeElement.focus();
    this.UpdateMode = true;
    this.UpdateDone = updateDone;
  }

  update(): void {
    this.validation();
    if (this.UpdateMode === true) {
      if (this.UpdateDone === true) {
        this.updateDonelist();
      } else {
        this.updateToDolist();
      }
    } else {
      this.addTaskToDo(this.InputName);
    }
    this.clear();
  }
  validation() {
    if (!this.InputName) {
      this.InValid = true;
      return;
    }
    this.InValid = false;
  }
  updateDonelist() {
    this.commonService.updateTask(this.DoneList, this.IdToUpdate, this.InputName);
    this.UpdateMode = false;
    console.log('updated ' + this.IdToUpdate + ' element in to do list');
  }

  updateToDolist() {
    this.commonService.updateTask(this.ToDoList, this.IdToUpdate, this.InputName);
    this.UpdateMode = false;
    console.log('updated ' + this.IdToUpdate + ' element in to do list');
  }

  addTaskDone(name, id) {
    const doneInstance = this.doneService.createDoneInstance(name, this.DoneList.length, id);
    this.DoneList.push(doneInstance);
  }
  addTaskToDo(name, id?) {
    const ToDoInstance = this.toDoService.createToDoInstance(name, this.ToDoList.length, id);
    this.ToDoList.push(ToDoInstance);
  }

  removeFromToDo(id) {
    this.commonService.removeFromArray(this.ToDoList, id);
  }

  removeFromDone(id) {
    this.commonService.removeFromArray(this.DoneList, id);
  }

  checkCheckBox(task) {
    this.addTaskDone(task.toDo, task.id);
    this.removeFromToDo(task.id);
  }

  uncheckCheckBox(task): void {
    this.addTaskToDo(task.done, task.id);
    this.removeFromDone(task.id);
  }

  clear() {
    if (this.InputName) {
      this.InputName = '';
    }
  }

}
