import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  InputName: string;
  UpdateMode = false;
  NameToUpdate: string;
  DataStore: DataStore;
  UpdateDone = false;

  @ViewChild('name') NameId: ElementRef;

  constructor() {
    this.DataStore = new DataStore();
    this.DataStore.TodoList = [];
    this.DataStore.checkBox = [];
    this.DataStore.id = null;
    this.DataStore.done = [];
  }

  deleteAElement(name): void {
    const index: number = this.DataStore.TodoList.indexOf(name);
    if (index !== -1) {
      this.DataStore.TodoList.splice(index, 1);
    }
  }

  updateElemet(name): void {
    this.NameToUpdate = name;
    this.NameId.nativeElement.focus();
    this.UpdateMode = true;
    console.log('setting mode to update for ' + this.InputName);
  }

  update(event): void {
    if (event.keyCode === 13) {
      if (this.UpdateMode === true) {
        if (this.UpdateDone === true) {
          const index: number = this.DataStore.done.indexOf(this.NameToUpdate);
          this.DataStore.done[index] = this.InputName;
          this.UpdateMode = false;
          console.log('updated ' + this.NameToUpdate + ' in to done');
        } else {
          const index: number = this.DataStore.TodoList.indexOf(this.NameToUpdate);
          this.DataStore.TodoList[index] = this.InputName;
          this.UpdateMode = false;
          console.log('updated ' + this.NameToUpdate + ' in to do list');
        }

      } else {
        this.DataStore.TodoList.push(this.InputName);
        console.log('added ' + this.InputName);
      }
    }
  }

  uncheckCheckBox(name): void {
    const index: number = this.DataStore.done.indexOf(name);
    this.DataStore.checkBox[index] = false;
    if (index !== -1) {
      this.DataStore.done.splice(index, 1);
      this.DataStore.TodoList.push(name);
    }
  }

  checkCheckBox(name) {
    const index: number = this.DataStore.TodoList.indexOf(name);
    this.DataStore.checkBox[index] = true;
    if (index !== -1) {
      this.DataStore.TodoList.splice(index, 1);
      this.DataStore.done.push(name);
    }
  }

  clear() {
    if (this.InputName) {
      this.InputName = '';
    }
  }

  deleteDoneElement(name) {
    const index: number = this.DataStore.done.indexOf(name);
    if (index !== -1) {
      this.DataStore.done.splice(index, 1);
    }
  }

  updateDoneElemet(name) {
    this.NameToUpdate = name;
    this.NameId.nativeElement.focus();
    this.UpdateMode = true;
    this.UpdateDone = true;
    console.log('setting mode to update for ' + this.InputName);
  }

}

export class DataStore {
  id: number;
  TodoList: string[];
  checkBox: boolean[];
  done: string[];
}
