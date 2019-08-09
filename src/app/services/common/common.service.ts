import { Injectable } from '@angular/core';
import { find, remove } from 'lodash';

@Injectable()
export class CommonService {

    findId(objectArray, IdToUpdate) {
        const valueToChange = find(objectArray, (o) => {
            return o.id === IdToUpdate;
        });
        return objectArray.indexOf(valueToChange);
    }

    removeFromArray(array, id) {
        remove(array, (n) => {
            console.log(n.id + ' going to be deleted');
            return n.id === id;
        });
    }

    updateTask(arrayTask, IdToUpdate, InputName) {
        const index = this.findId(arrayTask, IdToUpdate);
        if (arrayTask[index].toDo) {
            arrayTask[index].toDo = InputName;
        } else {
            arrayTask[index].done = InputName;
        }
        return arrayTask;
    }
}



