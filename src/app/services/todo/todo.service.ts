import { Injectable } from '@angular/core';
import { ToDoModel } from 'src/app/model/models';

@Injectable()
export class ToDoService {

    UniqueId = 0;

    createToDoInstance(name, length, id?) {
        const ToDoInstance = new ToDoModel();
        ToDoInstance.toDo = name;
        if (length === -1) {
            ToDoInstance.id = 0;
        } else if (id) {
            ToDoInstance.id = id;
        } else {
            ToDoInstance.id = this.UniqueId;
            this.UniqueId = this.UniqueId + 1;
        }
        return ToDoInstance;
    }
}




