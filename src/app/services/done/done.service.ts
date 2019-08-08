import { Injectable } from '@angular/core';
import { DoneModel } from 'src/app/model/models';

@Injectable()
export class DoneService {
    createDoneInstance(name, length, id) {
        const doneInstance = new DoneModel();
        doneInstance.done = name;
        if (length === -1) {
          doneInstance.id = 0;
        } else {
          doneInstance.id = id;
        }
        return doneInstance;
      }

}


