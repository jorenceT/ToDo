import { Component, ViewChild, ElementRef } from '@angular/core';
import { remove, find } from 'lodash';

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
  UniqueId = 0;

  @ViewChild('name') NameId: ElementRef;

  constructor() {
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

  updateDonelist() {
    const index = this.findId(this.DoneList);
    this.DoneList[index].done = this.InputName;
    this.UpdateMode = false;
    console.log('updated ' + this.IdToUpdate + ' element in to do list');
  }

  updateToDolist() {
    const index = this.findId(this.ToDoList);
    this.ToDoList[index].toDo = this.InputName;
    this.UpdateMode = false;
    console.log('updated ' + this.IdToUpdate + ' element in to do list');
  }

  findId(objectArray) {
    const valueToChange = find(objectArray, (o) => {
      return o.id === this.IdToUpdate;
    });
    return objectArray.indexOf(valueToChange);
  }

  addTaskDone(name, id) {
    const doneInstance = new DoneModel();
    doneInstance.done = name;
    if (this.DoneList.length === -1) {
      doneInstance.id = 0;
    } else {
      doneInstance.id = id;
    }
    this.DoneList.push(doneInstance);
  }

  addTaskToDo(name, id?) {
    const ToDoInstance = new ToDoModel();
    ToDoInstance.toDo = name;
    if (this.ToDoList.length === -1) {
      ToDoInstance.id = 0;
    } else if (id) {
      ToDoInstance.id = id;
    } else {
      ToDoInstance.id = this.UniqueId;
      this.UniqueId = this.UniqueId + 1;
    }
    this.ToDoList.push(ToDoInstance);
  }

  removeFromToDo(id) {
    remove(this.ToDoList, (n) => {
      console.log(n.id + ' going to be deleted');
      return n.id === id;
    });
  }

  removeFromDone(id) {
    remove(this.DoneList, (n) => {
      console.log(n.id + ' going to be deleted');
      return n.id === id;
    });
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

export class ToDoModel {
  id: number;
  toDo: string;
}

export class DoneModel {
  id: number;
  done: string;
}
